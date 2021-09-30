import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class VerifyEmailController {
  public async create({ auth, request, session, response }: HttpContextContract) {
    if (auth.user?.hasVerifiedEmail) {
      response.redirect().toRoute('dashboard')
      return
    }

    if (!request.hasValidSignature()) {
      session.flash({
        errors: {
          url: ['Signature is missing or URL was tampered.'],
        },
      })
      response.redirect().toRoute('dashboard')
      return
    }

    const user = await User.findByOrFail('id', Number(request.param('id')))
    const token = await user
      .related('tokens')
      .query()
      .where({ token: request.param('token'), type: 'VERIFY_EMAIL' })
      .first()

    if (!token) {
      session.flash({
        errors: {
          token: ['There was an error in loading your profile.'],
        },
      })
      response.redirect().toRoute('dashboard')
      return
    }

    user.emailVerifiedAt = DateTime.now()
    await user.save()
    await token.delete()

    session.flash({
      notification: {
        success: ['Thank you for verifying your email address.'],
      },
    })
    return response.redirect().withQs({ verified: 1 }).toRoute('dashboard')
  }
}
