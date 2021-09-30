import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailVerificationPromptController {
  public async create({ inertia, auth, response }: HttpContextContract) {
    if (auth.user?.hasVerifiedEmail) {
      response.redirect().toRoute('dashboard')
    }
    return inertia.render('Auth/VerifyEmail')
  }
}
