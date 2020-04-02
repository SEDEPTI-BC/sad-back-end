'use strict'

const { test, trait } = use('Test/Suite')('Event')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

test('authorized user can create a event', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
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
    .loginVia(user, 'jwt')
    .end()
  response.assertStatus(201)
})

test('unauthorized user can not create a event', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  user.delete()
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
    .loginVia(user, 'jwt')
    .end()
  response.assertStatus(401)
})

test('authorized user can delete event', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  const event = await Factory.model('App/Models/Event').create()

  const response = await client
    .delete(event.url())
    .send()
    .loginVia(user, 'jwt')
    .end()
  response.assertStatus(204)
})

test('unauthorized user can not delete event', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  const event = await Factory.model('App/Models/Event').create()
  user.delete()
  const response = await client
    .delete(event.url())
    .send()
    .loginVia(user, 'jwt')
    .end()
  response.assertStatus(401)
})
