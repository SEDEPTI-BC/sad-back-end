'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Event = use('App/Models/Event')

/**
 * Resourceful controller for interacting with events
 */
class EventController {
  async index({ request, response, view }) {}

  async store({ request, response }) {
    const event = await Event.create({
      ...request.only([
        'owner',
        'email',
        'title',
        'description',
        'start',
        'end',
      ]),
    })
    return response.created(event)
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {
    const event = await Event.findOrFail(params.id)
    await event.delete()
  }
}

module.exports = EventController
