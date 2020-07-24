'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const DisableDay = use('App/Models/DisableDay')
const Schedule = use('App/Models/Schedule')
const Database = use('Database')

class DisableDayController {
  async index({ request, response }) {
    let { all, limit, order, page } = request.all()

    let today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    today = `${year}-${month}-${day}`

    let disable_days = DisableDay

    if (all) {
      disable_days = await disable_days
        .query()
        .orderBy('title', order ?? 'asc')
        .with('schedules')
        .paginate(page ?? 1, limit ?? 10)
    } else {
      disable_days = await disable_days
        .query()
        .where('date', '>=', today)
        .orderBy('date', order ?? 'asc')
        .with('schedules')
        .paginate(page ?? 1, limit ?? 10)
    }

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
        const min = Math.min(...schedules)
        const max = Math.max(...schedules)

        let betweenSchedules = []

        for (let i = min; i <= max; i++) {
          betweenSchedules.push(i)
        }

        betweenSchedules.forEach(async (selected) => {
          const schedule = await Schedule.findBy('hour', selected)
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
    disableDays.merge({
      ...request.only(['date', 'title', 'description', 'full_day']),
    })

    if (!disableDays.full_day) {
      if (schedules) {
        const min = Math.min(...schedules)
        const max = Math.max(...schedules)

        let betweenSchedules = []

        for (let i = min; i <= max; i++) {
          betweenSchedules.push(i)
        }

        await disableDays.schedules().detach()

        betweenSchedules.forEach(async (selected) => {
          const schedule = await Schedule.findBy('hour', selected)
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

    return response.status(204).json({
      message: 'Excluído com sucesso',
    })
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

    let disableDaysSchedule = []

    for (const day of disabledDays) {
      const schedules_ids = await Database.select('schedule_id')
        .from('disable_day_schedule')
        .where('disable_day_id', day.id)
        .map((elem) => elem.schedule_id)

      const schedules = await Database.table('schedules').whereIn(
        'id',
        schedules_ids
      )

      disableDaysSchedule.push({ ...day, schedules })
    }

    response.json({
      disabledDays: disableDaysSchedule,
    })
  }
}

module.exports = DisableDayController
