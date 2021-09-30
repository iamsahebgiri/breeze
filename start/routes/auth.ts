import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/register', 'RegisterUserController.create').as('register')
    Route.post('/register', 'RegisterUserController.store')

    Route.get('/login', 'AuthenticatedSessionController.create').as('login')
    Route.post('/login', 'AuthenticatedSessionController.store')

    Route.get('/forgot-password', 'ForgotPasswordController.create').as('password.request')
    Route.post('/forgot-password', 'ForgotPasswordController.store').as('password.email')

    Route.get('/reset-password/:token', 'NewPasswordController.create').as('password.reset')
    Route.post('/reset-password', 'NewPasswordController.store').as('password.update')
  }).middleware('guest')

  Route.group(() => {
    Route.get('/verify-email', 'EmailVerificationPromptController.create').as('verification.prompt')
    Route.get('/verify-email/:id/:token', 'VerifyEmailController.create').as('verification.verify')
    Route.post(
      '/email/verification-notification',
      'EmailVerificationNotificationController.store'
    ).as('verification.send')

    Route.post('logout', 'AuthenticatedSessionController.destroy').as('logout')
  }).middleware('auth')
}).namespace('App/Controllers/Auth')
