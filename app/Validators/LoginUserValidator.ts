import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string(),
    remember: schema.boolean(),
  })

  public messages = {
    'email.required': 'Email is required',
    'email.email': 'Invalid email address',
    'password.required': 'Password is required',
  }
}
