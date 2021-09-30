import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginUserValidator from 'App/Validators/LoginUserValidator'

export default class AuthenticatedSessionController {
  /**
   * Display the login view
   */
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('Auth/Login', { canResetPassword: true })
  }

  /**
   * Handle login form submissions
   */
  public async store({ request, response, auth, inertia, session }: HttpContextContract) {
    const { email, password, remember } = await request.validate(LoginUserValidator)

    try {
      /**
       * Attempt to login the user with the email and password. The
       * "auth.attempt" method will perform all the required
       * validations.
       */
      await auth.attempt(email, password, remember)

      /**
       * Redirect to the dashboard
       */
      response.redirect('/dashboard')
    } catch {
      session.flash({
        errors: {
          email: ['These credentials do not match our records.'],
        },
      })
      return inertia.redirectBack()
    }
  }

  /**
   * Destroy user session (aka logout)
   */
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.redirect('/')
  }
}
