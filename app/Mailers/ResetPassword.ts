import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'

export default class ResetPassword extends BaseMailer {
  constructor(private token: string, private email: string) {
    super()
  }

  public html = mjml(View.renderSync('emails/reset_password', { token: this.token }), { fonts: {} })
    .html

  public prepare(message: MessageContract) {
    message
      .subject('Reset your password')
      .from('admin@breeze.com', 'Breeze')
      .to(this.email)
      .html(this.html)
  }
}
