'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DisableDay extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  static get dates() {
    return super.dates.concat(['start', 'end'])
  }
}

module.exports = DisableDay
