'use strict'

/*
|--------------------------------------------------------------------------
| EquipmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class EquipmentSeeder {
  async run() {
    const equipment = await Factory.model('App/Models/Equipment').createMany(5)
  }
}

module.exports = EquipmentSeeder
