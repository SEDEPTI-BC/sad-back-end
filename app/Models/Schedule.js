'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schedule extends Model {
  url() {
    return `/api/v1/schedules/${this.id}`
  }

  events() {
    this.belongsToMany('App/Models/Event').pivotTable('event_schedule')
  }

  disableDay() {
    this.belongsToMany('App/Models/DisableDay').pivotTable(
      'disable_day_schedule'
    )
  }
}

module.exports = Schedule
