'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Event = use('App/Models/Event')
const Equipment = use('App/Models/Equipment')

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

    const { equipments: selectedEquipments } = request.post()
    const equipment = await Equipment.findBy('name', selectedEquipments[0])
    await event.equipments().attach(equipment.id)

    return response.status(201).json({
      message: 'Evento criado com sucesso!',
      data: event,
    })
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
