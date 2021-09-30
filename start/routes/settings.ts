import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/settings/profile', async ({ inertia }) => {
    return inertia.render('Profile/Edit')
  }).as('profile.edit')

  Route.get('/settings/password', async ({ inertia }) => {
    return inertia.render('Password/Edit')
  }).as('password.edit')

  Route.get('/settings/account', async ({ inertia }) => {
    return inertia.render('Account/Edit')
  }).as('account.edit')
}).middleware('auth')
