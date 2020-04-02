'use strict'

const { test, trait } = use('Test/Suite')('Equipment')
const Equipment = use('App/Models/Equipment')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

test('authorized user can create a equipment', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const attributes = {
    name: 'teste',
  }
  const response = await client
    .post('/equipments')
    .send(attributes)
    .loginVia(user, 'jwt')
    .end()
  response.assertStatus(200)
})

test('unauthorized user can not create a equipment', async ({ client }) => {
  const response = await client
    .post('/equipments')
    .send({
      name: 'teste',
    })
    .end()
  response.assertStatus(401)
})

test('authorized user can view equipments', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .get('/equipments')
    .send()
    .loginVia(user, 'jwt')
    .end()
  console.log(response)

  response.assertStatus(200)
})

test('unauthorized user can not view equipments', async ({
  client,
  assert,
}) => {
  const response = await client
    .get('/equipments')
    .send()
    .end()
  response.assertStatus(401)
})

test('authorized user can update a equipment', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  const equipment = await Factory.model('App/Models/Equipment').create()
  const attributes = { name: 'new equipment' }
  const response = await client
    .put(equipment.url())
    .loginVia(user, 'jwt')
    .send(attributes)
    .end()
  response.assertStatus(200)
})

test('unauthorized user can not update a equipment', async ({
  client,
  assert,
}) => {
  const equipment = await Factory.model('App/Models/Equipment').create()
  const attributes = { name: 'new equipment' }
  const response = await client
    .put(equipment.url())
    .send(attributes)
    .end()
  response.assertStatus(401)
})

test('authorized user can delete equipment', async ({ client, assert }) => {
  const equipment = await Factory.model('App/Models/Equipment').create()
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .delete(equipment.url())
    .send()
    .loginVia(user, 'jwt')
    .end()
  response.assertStatus(204)
})

test('unauthorized user can not  delete equipment', async ({
  client,
  assert,
}) => {
  const equipment = await Factory.model('App/Models/Equipment').create()
  const response = await client
    .delete(equipment.url())
    .send()
    .end()
  response.assertStatus(401)
})
