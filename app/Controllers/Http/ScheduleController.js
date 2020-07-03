'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Schedule = use('App/Models/Schedule')

/**
 * Resourceful controller for interacting with schedules
 */
class ScheduleController {
  async index({ response }) {
    const schedules = await Schedule.all()
    return response.json({ schedules })
  }

  async store({ request, response }) {
    const schedule = await Schedule.create({ ...request.only(['value']) })
    return response.status(201).json({ schedule })
  }

  async update({ params, request, response }) {
    const schedule = await Schedule.findOrFail(params.id)
    schedule.merge(request.only(['value']))
    schedule.save()
    return response.json({ schedule })
  }

  async destroy({ params, request, response }) {}
}

module.exports = ScheduleController
