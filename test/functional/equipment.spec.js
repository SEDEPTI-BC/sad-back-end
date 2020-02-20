'use strict'

const { test, trait } = use('Test/Suite')('Equipment')
const Equipment = use('App/Models/Equipment')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('can create a equipment', async ({ client }) => {
  const response = await client
    .post('/equipments')
    .send({
      name: 'teste',
    })
    .end()

  console.log(
    response.error ? `can create a equipment: Error ===> ${response.error}` : ''
  )
  response.assertStatus(201)
})

test('can delete equipment', async ({ client, assert }) => {
  const equipment = await Factory.model('App/Models/Equipment').create()

  const response = await client
    .delete(equipment.url())
    .send()
    .end()
  console.log(
    response.error ? `can delete equipment: Error ===> ${response.error}` : ''
  )
  response.assertStatus(204)
  assert.equal(await Equipment.getCount(), 0)
})
