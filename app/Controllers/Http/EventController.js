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
  async index({ request, response }) {
    let { page } = request.all()
    page = page ? page : 1
    const events = await Event.query().paginate(page ? page : 1, 10)
    return response.json({ events })
  }

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

  async update({ params, request, response }) {
    const event = await Event.findOrFail(params.id)
    event.merge(
      request.only(['owner', 'email', 'title', 'description', 'start', 'end'])
    )
    event.save()
    return response.json({ event })
  }

  async destroy({ params, request, response }) {
    const event = await Event.findOrFail(params.id)
    await event.delete()
  }
}

module.exports = EventController
