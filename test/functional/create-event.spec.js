'use strict'

const { test, trait } = use('Test/Suite')('Create Event')
const Event = use('App/Models/Event')

trait('Test/ApiClient')

test('can create a event', async ({ assert, client }) => {
  const start = new Date()
  const end = new Date()
  const data = {
    start,
    end,
    title: 'Um debate sobre ergonomia',
    description:
      'Nesse evento iremos falar sobre questões da área da saúde de nossos bibliotecários...',
    owner: 'Fabricio Jr.',
    email: 'fabricio.js@gmail.com',
  }

  const response = await client
    .post('/events')
    .send(data)
    .end()

  console.log('error', response.error)
  response.assertStatus(201)
  response.assertJSONSubset({
    owner: 'Fabricio Jr.',
    email: 'fabricio.js@gmail.com',
    title: 'Um debate sobre ergonomia',
    description:
      'Nesse evento iremos falar sobre questões da área da saúde de nossos bibliotecários...',
    start,
    end,
  })
})
