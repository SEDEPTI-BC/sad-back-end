'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Event = use('App/Models/Event')
const Equipment = use('App/Models/Equipment')
const Schedule = use('App/Models/Schedule')
const Database = use('Database')
const Mail = use('Mail')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with events
 */
class EventController {
  async index({ request, response }) {
    let { page, all, limit, order } = request.all()

    let today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    today = `${year}-${month}-${day}`

    let events = Event

    if (all) {
      events = await events
        .query()
        .orderBy('date', order ?? 'desc')
        .with('equipments')
        .with('schedules')
        .paginate(page ?? 1, limit ?? 10)
    } else {
      events = await events
        .query()
        .where('date', '>=', today)
        .orderBy('date', order ?? 'desc')
        .with('equipments')
        .with('schedules')
        .paginate(page ?? 1, limit ?? 10)
    }

    return response.json({ events })
  }

  async store({ request, response }) {
    const { equipments, schedules } = request.post()
    let users = await Database.table('users')
    let event = null
    let betweenSchedules = []

    if (schedules) {
      event = await Event.create({
        ...request.only(['owner', 'email', 'title', 'description', 'date']),
      })

      const min = Math.min(...schedules)
      const max = Math.max(...schedules)

      for (let i = min; i <= max; i++) {
        betweenSchedules.push(i)
      }

      betweenSchedules.forEach(async (selected) => {
        const schedule = await Schedule.findBy('hour', selected)
        await event.schedules().attach([schedule.id])
      })
    } else {
      return response.status(400).json({
        message: 'Sem horários selecionado',
      })
    }

    if (equipments) {
      equipments.forEach(async (selected) => {
        const equipment = await Equipment.findBy('name', selected)
        await event.equipments().attach([equipment.id])
      })
    }

    event.schedules = [...betweenSchedules]
    event.equipments = [...equipments]

    await Mail.send('emails.createEvent', event.toJSON(), (message) => {
      message
        .to(event.email)
        .from('<from-email>')
        .subject('SAD-BC: Agendamento de evento')
        .embed(Helpers.resourcesPath('images/sad-logo.png'), 'logo')
    })

    users = users.map((user) => user.email)

    await Mail.send('emails.createEventAdmin', event.toJSON(), (message) => {
      message
        .to(users)
        .from('<from-email>')
        .subject('SAD-BC: Agendamento de evento')
        .embed(Helpers.resourcesPath('images/sad-logo.png'), 'logo')
    })

    return response.status(201).json({
      message: 'Evento criado com sucesso!',
      data: event,
    })
  }

  async update({ params, request, response }) {
    const { equipments, schedules } = request.post()
    let betweenSchedules = []
    const event = await Event.findOrFail(params.id)

    await event.merge(
      request.only(['owner', 'email', 'title', 'description', 'date'])
    )

    if (equipments) {
      await event.equipments().detach()
      equipments.forEach(async (selected) => {
        const equipment = await Equipment.findBy('name', selected)
        await event.equipments().attach([equipment.id])
      })
    }

    if (schedules) {
      const min = Math.min(...schedules)
      const max = Math.max(...schedules)

      for (let i = min; i <= max; i++) {
        betweenSchedules.push(i)
      }

      await event.schedules().detach()
      betweenSchedules.forEach(async (selected) => {
        const schedule = await Schedule.findBy('hour', selected)
        await event.schedules().attach([schedule.id])
      })
    }

    event.save()
    return response.status(200).json({
      message: 'Evento atualizado com sucesso!',
    })
  }

  async destroy({ params, request, response }) {
    const event = await Event.findOrFail(params.id)
    await event.delete()

    return response.json({
      message: 'Evento deletado com sucesso!',
    })
  }

  async currentMonth({ request, response }) {
    const { month, year } = request.all()
    const lastDay = new Date(year, month, 0).getDate()
    const firstDay = '01'

    const events = await Database.table('events').whereBetween('date', [
      `${year}-${month}-${firstDay}`,
      `${year}-${month}-${lastDay}`,
    ])

    let eventsSchedules = []

    for (const event of events) {
      const schedules_ids = await Database.select('schedule_id')
        .from('event_schedule')
        .where('event_id', event.id)
        .map((elem) => elem.schedule_id)

      const schedules = await Database.table('schedules').whereIn(
        'id',
        schedules_ids
      )

      eventsSchedules.push({ ...event, schedules })
    }

    response.json({
      events: eventsSchedules,
    })
  }
}

module.exports = EventController
