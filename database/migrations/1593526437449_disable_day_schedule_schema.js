'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisableDayScheduleSchema extends Schema {
  up() {
    this.create('disable_day_schedule', (table) => {
      table.increments()
      table.integer('schedule_id').unsigned()
      table.integer('disable_day_id').unsigned()

      table
        .foreign('schedule_id')
        .references('schedules.id')
        .onDelete('CASCADE')
      table
        .foreign('disable_day_id')
        .references('disable_days.id')
        .onDelete('CASCADE')
    })
  }

  down() {
    this.drop('disable_day_schedule')
  }
}

module.exports = DisableDayScheduleSchema
