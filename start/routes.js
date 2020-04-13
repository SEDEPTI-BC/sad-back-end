'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register').middleware('auth')
Route.post('/login', 'AuthController.login')
Route.put('/user', 'AuthController.update').middleware('auth')

Route.resource('equipments', 'EquipmentController')
  .only(['index', 'store', 'destroy', 'update'])
  .middleware('auth')

Route.resource('events', 'EventController')
  .only(['index', 'store', 'destroy', 'update'])
  .middleware('auth')

Route.resource('disable_days', 'DisableDayController')
  .only(['store', 'destroy', 'update'])
  .middleware('auth')
Route.get('/disable_days', 'DisableDayController.index')
