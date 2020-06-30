'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventSchema extends Schema {
  up() {
    this.create('events', (table) => {
      table.increments()
      table.string('owner').notNullable()
      table.string('email').notNullable()
      table.string('title').notNullable()
      table.text('description').defaultTo('')
      table.datetime('start', { presicion: 6 }).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('events')
  }
}

module.exports = EventSchema
