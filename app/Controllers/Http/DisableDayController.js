'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const DisableDay = use('App/Models/DisableDay')
const Schedule = use('App/Models/Schedule')
const Database = use('Database')

class DisableDayController {
  async index({ request, response }) {
    let { page } = request.all()
    page = page ? page : 1
    const disable_days = await DisableDay.query().paginate(page ? page : 1, 10)
    return response.status(200).json({ disable_days })
  }

  async store({ request, response, auth }) {
    const { schedules } = request.post()
    const user = await auth.getUser()
    const user_id = user.id

    const disableDays = await DisableDay.create({
      user_id,
      ...request.only(['date', 'title', 'description', 'full_day']),
    })

    if (!disableDays.full_day) {
      if (schedules) {
        schedules.forEach(async (selected) => {
          const schedule = await Schedule.findBy('value', selected)
          await disableDays.schedules().attach([schedule.id])
        })
      } else {
        return response.status(400).json({
          message: 'Sem horários selecionado',
        })
      }
    }

    return response.status(201).json({
      message: 'Dia desabilitado com sucesso',
      data: disableDays,
    })
  }

  async update({ params, request, response }) {
    const { schedules } = request.post()
    const disableDays = await DisableDay.findOrFail(params.id)
    disableDays.merge(request.all())

    if (!disableDays.full_day) {
      if (schedules) {
        schedules.forEach(async (selected) => {
          const schedule = await Schedule.findBy('value', selected)
          await disableDays.schedules().attach([schedule.id])
        })
      } else {
        return response.status(400).json({
          message: 'Sem horários selecionado',
        })
      }
    }

    disableDays.save()

    return response.status(200).json({
      message: 'Atualizado com sucesso',
      data: disableDays,
    })
  }

  async destroy({ params, response }) {
    const disable_days = await DisableDay.findOrFail(params.id)
    await disable_days.delete()

    return response.status(204)
  }

  async currentMonth({ request, response }) {
    const { month, year } = request.all()
    const lastDay = new Date(year, month, 0).getDate()
    const firstDay = '01'

    const disabledDays = await Database.table(
      'disable_days'
    ).whereBetween('date', [
      `${year}-${month}-${firstDay}`,
      `${year}-${month}-${lastDay}`,
    ])

    const disabled_days_ids = disabledDays.map((day) => day.id)
    disabledDays
    const schedules_ids = await Database.select('schedule_id')
      .from('disable_day_schedule')
      .whereIn('disable_day_id', disabled_days_ids)
      .map((elem) => elem.schedule_id)

    const schedules = await Database.table('schedules').whereIn(
      'id',
      schedules_ids
    )

    response.json({
      disabledDays,
    })
  }
}

module.exports = DisableDayController
