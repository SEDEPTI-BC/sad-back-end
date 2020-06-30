'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DisableDay extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  schedules() {
    return this.belongsToMany('App/Models/Schedule').pivotTable(
      'event_schedule'
    )
  }

  static get dates() {
    return super.dates.concat(['start', 'end'])
  }
}

module.exports = DisableDay
