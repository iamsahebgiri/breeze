import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    password: schema.string({}, [rules.minLength(6), rules.confirmed('password_confirmation')]),
  })

  public messages = {
    'name.required': 'Name is required',
    'email.required': 'Email is required',
    'email.unique': 'Email is already in use',
    'email.email': 'Invalid email address',
    'password.required': 'Password is required',
    'password.minLength': 'Password too short',
    'password_confirmation.confirmed': "Passwords don't match",
  }
}
