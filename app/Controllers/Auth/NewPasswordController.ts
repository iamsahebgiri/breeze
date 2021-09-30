import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Token from 'App/Models/Token'
import User from 'App/Models/User'
import NewPasswordValidator from 'App/Validators/NewPasswordValidator'

export default class NewPasswordController {
  public async create({ inertia, request }: HttpContextContract) {
    return inertia.render('Auth/ResetPassword', {
      token: request.param('token'),
    })
  }

  public async store({ request, session, inertia, response }: HttpContextContract) {
    const data = await request.validate(NewPasswordValidator)

    const token = await Token.findByOrFail('token', data.token)

    if (token.isExpired) {
      session.flash({ errors: { token: 'Reset token has expired.' } })
      return inertia.redirectBack()
    }

    const user = await User.findByOrFail('id', token.userId)
    user.password = data.password
    await user.save()

    await token.delete()

    session.flash({ notification: { success: 'Password changed successfully.' } })
    response.redirect().toRoute('login')
  }
}
