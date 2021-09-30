import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NewPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    token: schema.string({}, [
      rules.exists({
        table: 'tokens',
        column: 'token',
      }),
    ]),
    password: schema.string({}, [rules.minLength(6), rules.confirmed('password_confirmation')]),
  })

  public messages = {
    'token.exists': 'Reset token is invalid.',
    'password.required': 'Password is required',
    'password.minLength': 'Password too short',
    'password_confirmation.confirmed': "Passwords don't match",
  }
}
