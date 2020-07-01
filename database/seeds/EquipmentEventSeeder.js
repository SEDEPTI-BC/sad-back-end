'use strict'

/*
|--------------------------------------------------------------------------
| EquipmentEventSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class EquipmentEventSeeder {
  async run() {
    // await Factory.get('equipment_event').createMany(5)
  }
}

module.exports = EquipmentEventSeeder
