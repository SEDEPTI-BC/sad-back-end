'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const DisableDay = use('App/Models/DisableDay')
const Database = use('Database')

class DisableDayController {
  async index({ request, response }) {
    let { page } = request.all()
    page = page ? page : 1
    const disable_days = await DisableDay.query().paginate(page ? page : 1, 10)
    return response.status(200).json({ disable_days })
  }

  async store({ request, response, auth }) {
    const user = await auth.getUser()
    const user_id = user.id
    const attributes = {
      user_id,
      ...request.only(['start', 'end', 'title', 'description']),
    }
    const disable_day = await DisableDay.create(attributes)
    return response.status(201).json({
      message: 'Dia desabilitado com sucesso',
      data: disable_day,
    })
  }

  async update({ params, request, response }) {
    const disable_days = await DisableDay.findOrFail(params.id)
    disable_days.merge(request.all())
    disable_days.save()
    return response.status(200).json({
      message: 'Atualizado com sucesso',
      data: disable_days,
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
    const disabled_days = await Database.table(
      'disable_days'
    ).whereBetween('start', [
      `${year}-${month}-01`,
      `${year}-${month}-${lastDay}`,
    ])

    response.json({
      disabled_days,
      lastDay,
    })
  }
}

module.exports = DisableDayController
