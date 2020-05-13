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
    .post('/api/v1/register')
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
  const response = await client.post('/api/v1/register').send(data).end()

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
    .put('/api/v1/user')
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
    .put('/api/v1/user')
    .send(data)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(401)
})

test('authorized user can get their user data', async ({ assert, client }) => {
  const admin = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/v1/me')
    .send()
    .loginVia(admin, 'jwt')
    .end()
  response.assertStatus(200)
})

test('authorized user can not get their user data', async ({
  assert,
  client,
}) => {
  const admin = await Factory.model('App/Models/User').create()
  admin.delete()

  const response = await client
    .get('/api/v1/me')
    .send()
    .loginVia(admin, 'jwt')
    .end()
  response.assertStatus(401)
})
