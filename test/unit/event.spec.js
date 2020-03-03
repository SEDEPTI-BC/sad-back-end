'use strict'
const { test, trait } = use('Test/Suite')('Event')
const Factory = use('Factory')

trait('DatabaseTransactions')

test('can access url', async ({ assert }) => {
  const event = await Factory.model('App/Models/Event').create()
  assert.equal(event.url(), `events/${event.id}`)
})
