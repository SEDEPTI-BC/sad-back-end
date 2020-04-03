'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquipmentEventSchema extends Schema {
  up() {
    this.create('equipment_event', table => {
      table.increments()
      table.integer('equipment_id').unsigned()
      table.integer('event_id').unsigned()
      table.timestamps()

      table
        .foreign('equipment_id')
        .references('equipment.id')
        .onDelete('CASCADE')
      table
        .foreign('event_id')
        .references('events.id')
        .onDelete('CASCADE')
    })
  }

  down() {
    this.drop('equipment_event')
  }
}

module.exports = EquipmentEventSchema
