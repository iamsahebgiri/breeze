import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ForgotPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.exists({
        table: 'users',
        column: 'email',
        caseInsensitive: true,
      }),
    ]),
  })

  public messages = {
    'email.required': 'Email is required',
    'email.email': 'Email is not a valid email address',
    'email.exists': 'Account with that email address does not exist',
  }
}
