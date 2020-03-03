'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')
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
  const response = await client
    .post('/register')
    .send(data)
    .end()

  response.assertStatus(401)
})
