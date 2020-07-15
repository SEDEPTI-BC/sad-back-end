'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Equipment = use('App/Models/Equipment')

class EquipmentController {
  async index({ request, response }) {
    const { page, limit, order } = request.all()
    const equipments = await Equipment.query()
      .orderBy('name', order ?? 'asc')
      .paginate(page ?? 1, limit ?? 10)
    return response.json({ equipments })
  }

  async store({ request, response }) {
    let attributes = { ...request.only(['name']) }
    attributes.name = attributes.name.toLowerCase()
    const equipment = await Equipment.create(attributes)
    return response.json({ equipment })
  }

  async update({ params, request, response }) {
    const equipment = await Equipment.findOrFail(params.id)
    equipment.merge(request.only(['name']))
    equipment.save()
    return response.json({ equipment })
  }

  async destroy({ params, response }) {
    const equipment = await Equipment.findOrFail(params.id)
    await equipment.delete()
    return response.json({
      message: 'Deletado com sucesso',
    })
  }
}

module.exports = EquipmentController
