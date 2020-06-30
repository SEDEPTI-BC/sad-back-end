'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisableDaySchema extends Schema {
  up() {
    this.create('disable_days', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.datetime('start').notNullable()
      table.string('title').notNullable()
      table.string('description')
      table.timestamps()

      table.foreign('user_id').references('users.id').onDelete().onUpdate()
    })
  }

  down() {
    this.drop('disable_days')
  }
}

module.exports = DisableDaySchema
