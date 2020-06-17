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

    let today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    today = `${year}-${month}-${day}`

    const events = await Event.query()
      .where('created_at', '>=', today)
      .orderBy('created_at', 'asc')
      .with('equipments')
      .paginate(1, 10)

    return response.json({ events })
  }

  async store({ request, response }) {
    const { equipments } = request.post()

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

    if (equipments) {
      equipments.forEach(async (selected) => {
        const equipment = await Equipment.findBy('name', selected)
        await event.equipments().attach([equipment.id])
      })
    }

    return response.status(201).json({
      message: 'Evento criado com sucesso!',
      data: event,
    })
  }

  async update({ params, request, response }) {
    const { equipments } = request.post()

    const event = await Event.findOrFail(params.id)

    await event.merge(
      request.only(['owner', 'email', 'title', 'description', 'start', 'end'])
    )

    if (equipments) {
      await event.equipments().detach()
      equipments.forEach(async (selected) => {
        const equipment = await Equipment.findBy('name', selected)
        await event.equipments().attach([equipment.id])
      })
    }
    event.save()
    return response.status(200).json({
      message: 'Evento atualizado com sucesso!',
      data: event,
    })
  }

  async destroy({ params, request, response }) {
    const event = await Event.findOrFail(params.id)
    await event.delete()

    return response.status(204).json({
      message: 'Evento deletado com sucesso!',
    })
  }
}

module.exports = EventController
