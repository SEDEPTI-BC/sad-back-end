'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  url() {
    return `events/${this.id}`
  }

  equipments() {
    return this.belongsToMany('App/Models/Equipment').pivotTable(
      'equipment_event'
    )
  }
}

module.exports = Event
