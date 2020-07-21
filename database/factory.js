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
const Equipment = use('App/Models/Equipment')

Factory.blueprint('App/Models/User', (faker) => {
  const username = faker.name({ nationality: 'it' })
  const email = username.split(' ').join('.') + 'email.com'

  return {
    username,
    email,
    password: '123456',
  }
})

Factory.blueprint('App/Models/Event', (faker) => {
  const now = new Date()
  const thisYear = now.getFullYear()
  const month = Math.random() * (11 - 0) + 0
  const day = Math.random() * (27 - 1) + 1
  const date = new Date(thisYear, month, day)

  const owner = faker.name({ nationality: 'it' })
  const email = owner.split(' ').join('.') + 'email.com'

  return {
    owner,
    email,
    title: faker.word(),
    description: faker.sentence({ words: 10 }),
    date,
  }
})

Factory.blueprint('App/Models/Schedule', (faker) => {
  const hour = Math.ceil(Math.random() * (20 - 8) + 8)
  return { hour }
})

Factory.blueprint('App/Models/Equipment', (faker) => {
  return {
    name: faker.word(),
  }
})

Factory.blueprint('App/Models/DisableDay', async (faker) => {
  const user = await Factory.model('App/Models/User').create()
  const now = new Date()
  const thisYear = now.getFullYear()
  const month = Math.random() * (11 - 0) + 0
  const day = Math.random() * (27 - 1) + 1
  const date = new Date(thisYear, month, day)
  const full_day = Math.random() < 0.5

  return {
    title: faker.word(),
    description: faker.sentence({ words: 10 }),
    full_day,
    date,
    user_id: user.id,
  }
})

Factory.blueprint('disable_day_schedule', async (faker) => {
  const schedule = await Factory.model('App/Models/Schedule').create()
  const disableDay = await Factory.model('App/Models/DisableDay').create()

  return {
    schedule_id: schedule.id,
    disable_day_id: disableDay.id,
  }
})

Factory.blueprint('event_schedule', async () => {
  const schedule = await Factory.model('App/Models/Schedule').create()
  const event = await Factory.model('App/Models/Event').create()
  await Factory.get('equipment_event').create(event)

  return {
    schedule_id: schedule.id,
    event_id: event.id,
  }
})

Factory.blueprint('equipment_event', async (faker, i, event) => {
  const equipment = await Factory.model('App/Models/Equipment').create()
  return {
    event_id: event.id,
    equipment_id: equipment.id,
  }
})
