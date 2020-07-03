'use strict'

/*
|--------------------------------------------------------------------------
| EventScheduleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class EventScheduleSeeder {
  async run() {
    const eventSchedules = await Factory.get('event_schedule').createMany(5)
  }
}

module.exports = EventScheduleSeeder
