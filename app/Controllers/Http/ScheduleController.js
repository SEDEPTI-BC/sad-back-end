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
    const schedule = await Schedule.create({
      ...request.only(['hour', 'available']),
    })
    return response.status(201).json({ schedule })
  }

  async update({ params, request, response }) {
    const schedule = await Schedule.findOrFail(params.id)
    schedule.merge(request.only(['hour', 'available']))
    schedule.save()
    return response.json({ schedule })
  }

  async destroy({ params, response }) {
    const schedule = await Schedule.findOrFail(params.id)
    await schedule.delete()
    return response.json({
      message: 'Deletado com sucesso',
    })
  }

  async disabledScheludes({ response, request }) {
    const { date } = request.all()
    const events = await Database.table('events').where('date', date)
    const disableDays = await Database.table('disable_days').where('date', date)

    let disabledDays = []

    for (const day of disableDays) {
      const schedules_ids = await Database.select('schedule_id')
        .from('disable_day_schedule')
        .where('disable_day_id', day.id)
        .map((elem) => elem.schedule_id)

      const schedules = await Database.table('schedules').whereIn(
        'id',
        schedules_ids
      )
      disabledDays = disabledDays.concat(schedules)
    }

    for (const event of events) {
      const schedules_ids = await Database.select('schedule_id')
        .from('event_schedule')
        .where('event_id', event.id)
        .map((elem) => elem.schedule_id)

      const schedules = await Database.table('schedules').whereIn(
        'id',
        schedules_ids
      )
      disabledDays = disabledDays.concat(schedules)
    }

    disabledDays = disabledDays.map((schedule) => schedule.id)

    const availableSchedules = await Database.table('schedules')
      .whereNotIn('id', disabledDays)
      .orderBy('hour', 'asc')

    return response.json({
      schedules: availableSchedules,
    })
  }
}

module.exports = ScheduleController
