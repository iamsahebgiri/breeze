import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import ForgotPasswordValidator from 'App/Validators/ForgotPasswordValidator'
import ResetPassword from 'App/Mailers/ResetPassword'
import User from 'App/Models/User'

export default class ForgotPasswordController {
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('Auth/ForgotPassword')
  }

  public async store({ request, inertia, session }: HttpContextContract) {
    const { email } = await request.validate(ForgotPasswordValidator)
    const token = string.generateRandom(64)

    const user = await User.findBy('email', email)
    await user?.related('tokens').create({ token, type: 'RESET_PASSWORD' })
    await new ResetPassword(token, email).sendLater()

    session.flash({
      notification: {
        success: `An e-mail has been sent to ${email} with further instructions.`,
      },
    })
    return inertia.redirectBack()
  }
}
