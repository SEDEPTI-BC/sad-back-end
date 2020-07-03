'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Schedule = use('App/Models/Schedule')
const Database = use('Database')

/**
 * Resourceful controller for interacting with schedules
 */
class ScheduleController {
  async index({ response }) {
    const schedules = await Database.table('schedules').orderBy('hour', 'asc')
    return response.json({ schedules })
  }

  async store({ request, response }) {
    const schedule = await Schedule.create({ ...request.only(['hour']) })
    return response.status(201).json({ schedule })
  }

  async update({ params, request, response }) {
    const schedule = await Schedule.findOrFail(params.id)
    schedule.merge(request.only(['hour']))
    schedule.save()
    return response.json({ schedule })
  }

  async destroy({ params, request, response }) {
    const schedule = await Schedule.findOrFail(params.id)
    await schedule.delete()
    return response.json({
      message: 'Deletado com sucesso',
    })
  }
}

module.exports = ScheduleController
