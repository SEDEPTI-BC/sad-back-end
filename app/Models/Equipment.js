'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equipment extends Model {
  url() {
    return `/api/v1/equipments/${this.id}`
  }

  events() {
    this.belongsToMany('App/Models/Event').pivotTable('equipment_event')
  }
}

module.exports = Equipment
