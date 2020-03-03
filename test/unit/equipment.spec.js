'use strict'

const { test, trait } = use('Test/Suite')('Equipment')
const Factory = use('Factory')

trait('DatabaseTransactions')

test('can access url', async ({ assert }) => {
  const equipment = await Factory.model('App/Models/Equipment').create()
  assert.equal(equipment.url(), `equipments/${equipment.id}`)
})
