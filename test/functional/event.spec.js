'use strict'

const { test, trait } = use('Test/Suite')('Event')
const Event = use('App/Models/Event')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('can create a event', async ({ client }) => {
  const response = await client
    .post('/events')
    .send({
      owner: 'teste',
      title: 'teste',
      email: 'teste@gmail.com',
      description: 'teste',
      start: '2020-02-02 00:00:00',
      end: '2020-02-02 00:00:00',
    })
    .end()

  console.log('can create a event: Error ===>', response.error)
  response.assertStatus(201)
  const event = await Event.firstOrFail(1)
  response.assertJSONSubset(event.toJSON())
})

test('can delete event', async ({ client, assert }) => {
  const event = await Factory.model('App/Models/Event').create()

  const response = await client
    .delete(event.url())
    .send()
    .end()
  console.log('can delete event: Error ===>', response.error)
  response.assertStatus(204)
  assert.equal(await Event.getCount(), 0)
})
