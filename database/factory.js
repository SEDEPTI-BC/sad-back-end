'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: '123456',
  }
})

Factory.blueprint('App/Models/Event', (faker) => {
  return {
    owner: faker.name(),
    email: faker.email({ domain: 'gmail.com' }),
    title: faker.word(),
    description: faker.sentence({ words: 10 }),
    start: '2020-02-10 10:51:16',
    end: '2020-02-10 12:51:16',
  }
})

Factory.blueprint('App/Models/Equipment', (faker) => {
  return {
    name: faker.word(),
  }
})

Factory.blueprint('App/Models/DisableDay', async (faker) => {
  const day = Math.random() * (31 - 1) + 1
  const now = new Date()
  const month = now.getMonth()

  const start = new Date(2020, month, day, 8)
  const end = new Date(2020, month, day, 12)

  const user = await Factory.model('App/Models/User').create()

  return {
    title: faker.word(),
    description: faker.sentence({ words: 10 }),
    start: start,
    end: end,
    user_id: user.id,
  }
})
