import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSword
      }
    })
  }

  async sendMail(email, activationLink){
    await this.transporter.sendMail({
      from:process.env.SMTP_USER,
      to: email,
      subject: `Activation account link ${activationLink}`,
      html: `
        <div>
          <a href="${activationLink}">click to activate account: ${activationLink}</a>
        </div>
      `
    })
  }
}

const Mail = new MailService();
export default Mail;