import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import Route from '@ioc:Adonis/Core/Route'
import mailchecker from 'mailchecker'

export default class EmailVerificationNotificationsController {
  public async store({ auth, inertia, session, response }: HttpContextContract) {
    if (auth.user?.hasVerifiedEmail) {
      response.redirect().toRoute('dashboard')
    }

    const { email, id } = auth.user!

    if (!mailchecker.isValid(email)) {
      session.flash({
        errors: {
          email: [
            'The email address is invalid or disposable and can not be verified. Please update your email address and try again.',
          ],
        },
      })
      response.redirect().toRoute('dashboard')
    }

    const token = string.generateRandom(64)
    await auth.user?.related('tokens').create({ token, type: 'VERIFY_EMAIL' })
    const signedUrl = Route.makeSignedUrl('verification.verify', { token, id })
    await new VerifyEmail(signedUrl, email).sendLater()

    session.flash({
      notification: {
        success: `A new verification link has been sent to the ${email}.`,
      },
    })
    return inertia.redirectBack()
  }
}
