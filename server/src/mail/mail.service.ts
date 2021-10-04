import { createTransport } from 'nodemailer';
import { Inject } from '@nestjs/common';
import { MAIL_OPTIONS } from './mail.constants';

export class MailService {
  constructor(@Inject(MAIL_OPTIONS) private mailOptions) {}
  async sendMessage(to, activationLink) {
    try {
      const transporter = this.buildSmtpTransporter();
      await transporter.verify();
      await this.buildMailMessage(transporter, to, activationLink);
    } catch (e) {}
    // console.log(createTransport)
    // console.log('mailing to', to, activationLink)
  }
  buildSmtpTransporter() {
    return createTransport({
      host: this.mailOptions.smtpHost,
      port: this.mailOptions.smtpPort,
      auth: {
        user: this.mailOptions.smtpUsername,
        pass: this.mailOptions.smtpPassword,
      },
    });
  }
  async buildMailMessage(transporter, to, activationLink) {
    return await transporter.sendMail({
      from: this.mailOptions.SMTP_USERNAME,
      to,
      subject: 'Activation link',
      html: `
                    <h1>Your activation link..</h1>
                    <a target="_blank" href=${activationLink}>${activationLink}</a>
                `,
    });
    // this.transporter.send
  }
}
