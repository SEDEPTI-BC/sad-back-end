'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventScheduleSchema extends Schema {
  up() {
    this.create('event_schedule', (table) => {
      table.increments()
      table.integer('schedule_id').unsigned()
      table.integer('event_id').unsigned()

      table
        .foreign('schedule_id')
        .references('schedules.id')
        .onDelete('CASCADE')
      table.foreign('event_id').references('events.id').onDelete('CASCADE')
    })
  }

  down() {
    this.drop('event_schedule')
  }
}

module.exports = EventScheduleSchema
