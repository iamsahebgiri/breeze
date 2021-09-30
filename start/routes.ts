/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './routes/auth'
import './routes/settings'

Route.get('/', async ({ inertia }) => {
  return inertia.render('Home')
}).as('home')

Route.get('/session', async ({ session }) => {
  console.log(session.all())
  return
}).domain(':tenant.adonisjs.com')

Route.get('/dashboard', async ({ inertia }) => {
  return inertia.render('Dashboard')
})
  .as('dashboard')
  .middleware('auth')

Route.resource('tasks', 'TasksController')

Route.get('/:username', async ({ inertia }) => {
  return inertia.render('Profile/Show')
})
  .as('profile.show')
  .middleware('auth')
