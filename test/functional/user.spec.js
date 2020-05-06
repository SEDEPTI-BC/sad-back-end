'use strict'

const { test, trait } = use('Test/Suite')('User')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

test('authorized user can register a user', async ({ assert, client }) => {
  const admin = await Factory.model('App/Models/User').create()
  const data = { username: 'test', email: 'test', password: '123456' }

  const response = await client
    .post('/register')
    .send(data)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(200)
})

test('unauthorized user can not register a user', async ({
  assert,
  client,
}) => {
  const data = { username: 'test', email: 'test', password: '123456' }
  const response = await client.post('/register').send(data).end()

  response.assertStatus(401)
})

test('authorized user can update their data', async ({ assert, client }) => {
  const admin = await Factory.model('App/Models/User').create()
  const data = {
    username: 'test2',
    email: 'test2',
    currentPassword: '123456',
    newPassword: 'abcde',
  }
  const response = await client
    .put('/user')
    .send(data)
    .loginVia(admin, 'jwt')
    .end()
  response.assertStatus(200)
})

test('unauthorized user can not update their data', async ({
  assert,
  client,
}) => {
  const admin = await Factory.model('App/Models/User').create()

  await admin.delete()

  const data = {
    username: 'test2',
    email: 'test2',
    currentPassword: '123456',
    newPassword: 'abcde',
  }

  const response = await client
    .put('/user')
    .send(data)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(401)
})
