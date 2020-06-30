'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  url() {
    return `/api/v1/events/${this.id}`
  }

  equipments() {
    return this.belongsToMany('App/Models/Equipment').pivotTable(
      'equipment_event'
    )
  }

  schedules() {
    return this.belongsToMany('App/Models/Schedule').pivotTable(
      'event_schedule'
    )
  }

  static get dates() {
    return super.dates.concat(['date'])
  }
}

module.exports = Event
