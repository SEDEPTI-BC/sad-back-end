'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Equipment = use('App/Models/Equipment')
/**
 * Resourceful controller for interacting with equipment
 */
class EquipmentController {
  /**
   * Show a list of all equipment.
   * GET equipment
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    let { page } = request.all()
    page = page ? page : 1
    const equipments = await Equipment.query().paginate(page ? page : 1, 10)
    return response.json({ equipments })
  }

  /**
   * Create/save a new equipment.
   * POST equipment
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const attributes = { ...request.only(['name']) }
    const equipment = await Equipment.create(attributes)
    return response.json({ equipment })
  }

  /**
   * Display a single equipment.
   * GET equipment/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update equipment details.
   * PUT or PATCH equipment/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const equipment = await Equipment.findOrFail(params.id)
    equipment.merge(request.only(['name']))
    equipment.save()
    return response.json({ equipment })
  }

  /**
   * Delete a equipment with id.
   * DELETE equipment/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const equipment = await Equipment.findOrFail(params.id)
    await equipment.delete()
  }
}

module.exports = EquipmentController
