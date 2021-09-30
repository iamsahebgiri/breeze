import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'

export default class VerifyEmail extends BaseMailer {
  constructor(private signedUrl: string, private email: string) {
    super()
  }

  public html = mjml(View.renderSync('emails/verify_email', { signedUrl: this.signedUrl }), {
    fonts: {},
  }).html

  public prepare(message: MessageContract) {
    message
      .subject('Please verify your email address')
      .from('admin@breeze.com', 'Breeze')
      .to(this.email)
      .html(this.html)
  }
}
