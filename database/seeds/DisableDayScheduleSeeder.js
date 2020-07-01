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

class DisableDayScheduleSeeder {
  async run() {
    const disableDaychedules = await Factory.get(
      'disable_day_schedule'
    ).createMany(5)
  }
}

module.exports = DisableDayScheduleSeeder
