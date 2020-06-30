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
    username: faker.name({ nationality: 'it' }),
    email: faker.email(),
    password: '123456',
  }
})

Factory.blueprint('App/Models/Event', (faker) => {
  const now = new Date()
  const thisYear = now.getFullYear()
  const month = faker.hour({ twentyfour: true })
  const day = faker.hour({ twentyfour: true })

  return {
    owner: faker.name({ nationality: 'it' }),
    email: faker.email({ domain: 'gmail.com' }),
    title: faker.word(),
    description: faker.sentence({ words: 10 }),
    date: `${thisYear}-${month}-${day} 00:00:00`,
  }
})

Factory.blueprint('App/Models/Schedule', (faker) => {
  const hour = Math.random() * (20 - 8) + 8
  return { value: `${hour}:00:00` }
})

Factory.blueprint('App/Models/Equipment', (faker) => {
  return {
    name: faker.word(),
  }
})

Factory.blueprint('App/Models/DisableDay', async (faker) => {
  const day = Math.random() * (31 - 1) + 1
  const now = new Date()
  const year = now.getFullYear()
  const month = faker.hour() - 1
  const date = new Date(year, month, day, 8)

  const user = await Factory.model('App/Models/User').create()

  return {
    title: faker.word(),
    description: faker.sentence({ words: 10 }),
    date: date,
    user_id: user.id,
  }
})

Factory.blueprint('equipment_event', async (faker) => {
  const equipment = await Factory.model('App/Models/Equipment').create()
  const event = await Factory.model('App/Models/Event').create()

  return {
    event_id: equipment.id,
    equipment_id: event.id,
  }
})

// Factory.blueprint('event_schedule', async (faker) => {
//   const event = await Factory.model('App/Models/Event').create()
//   const schedule = await Factory.model('App/Models/Schedule').create()

//   return {
//     event_id: event.id,
//     schedule_id: schedule.id,
//   }
// })
