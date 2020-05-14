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

Route.group(() => {
  Route.post('/register', 'AuthController.register').middleware('auth:jwt')
  Route.post('/login', 'AuthController.login')
  Route.get('/me', 'AuthController.me').middleware(['auth:jwt'])
  Route.put('/user', 'AuthController.update').middleware(['auth:jwt'])

  Route.resource('equipments', 'EquipmentController')
    .only(['store', 'destroy', 'update'])
    .middleware(['auth:jwt'])
  Route.get('/equipments', 'EquipmentController.index')

  Route.resource('events', 'EventController')
    .only(['index', 'store', 'destroy', 'update'])
    .middleware('auth:jwt')

  Route.resource('disable_days', 'DisableDayController')
    .only(['store', 'destroy', 'update'])
    .middleware('auth:jwt')
  Route.get('/disable_days', 'DisableDayController.index')
}).prefix('/api/v1')
