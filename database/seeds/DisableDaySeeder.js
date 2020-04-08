'use strict'

/*
|--------------------------------------------------------------------------
| DisableDaySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DisableDaySeeder {
  async run() {
    const disable_day = await Factory.model('App/Models/DisableDay').createMany(
      5
    )
  }
}

module.exports = DisableDaySeeder
