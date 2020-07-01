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
    // const schedules = await Factory.get('event_schedule').createMany(5, [
    //   1,
    //   2,
    //   3, 
    //   4,
    //   5,
    // ])
    // console.log(schedules)
  }
}

module.exports = EventScheduleSeeder
