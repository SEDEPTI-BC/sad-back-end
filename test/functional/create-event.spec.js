'use strict'

const { test, trait } = use('Test/Suite')('Create Event')
const Event = use('App/Models/Event')

trait('Test/ApiClient')

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

  console.log('Error ===>', response.error)
  response.assertStatus(200)
  const event = await Event.firstOrFail()
  response.assertJSON({ event: event.toJSON() })
})
