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

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ScheduleController
