import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class RegisterUserController {
  /**
   * Display the registration view
   */
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('Auth/Register')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    /**
     * Validate new user account creation form
     */
    const payload = await request.validate(RegisterUserValidator)

    /**
     * Create a new user
     */
    const user = await User.create(payload)

    /**
     * Login the user
     */
    await auth.login(user)

    /**
     * Redirect to the home page
     */
    response.redirect('/dashboard')
  }
}
