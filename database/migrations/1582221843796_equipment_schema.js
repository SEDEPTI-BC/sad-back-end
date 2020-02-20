'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquipmentSchema extends Schema {
  up () {
    this.create('equipment', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('equipment')
  }
}

module.exports = EquipmentSchema
