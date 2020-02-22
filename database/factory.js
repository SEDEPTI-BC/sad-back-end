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

Factory.blueprint('App/Models/User', faker => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: '123456',
  }
})

Factory.blueprint('App/Models/Event', faker => {
  return {
    owner: faker.name(),
    email: faker.email({ domain: 'gmail.com' }),
    title: faker.word(),
    description: faker.sentence({ words: 10 }),
    start: '2020-02-10 10:51:16',
    end: '2020-02-10 10:51:16',
  }
})

Factory.blueprint('App/Models/Equipment', faker => {
  return {
    name: faker.name(),
  }
})
