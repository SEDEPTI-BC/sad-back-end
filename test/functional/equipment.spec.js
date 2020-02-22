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
    .loginVia(user)
    .end()
  response.assertStatus(200)
})

test('unauthorized user cannot create a equipment', async ({ client }) => {
  const response = await client
    .post('/equipments')
    .send({
      name: 'teste',
    })
    .end()

  response.assertStatus(401)
})

test('authorized user can delete equipment', async ({ client, assert }) => {
  const equipment = await Factory.model('App/Models/Equipment').create()
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .delete(equipment.url())
    .send()
    .loginVia(user)
    .end()
  response.assertStatus(204)
  assert.equal(await Equipment.getCount(), 0)
})

test('unauthorized user cannot  delete equipment', async ({
  client,
  assert,
}) => {
  const equipment = await Factory.model('App/Models/Equipment').create()
  const response = await client
    .delete(equipment.url())
    .send()
    .end()
  assert.equal(await Equipment.getCount(), 1)
  response.assertStatus(401)
})
