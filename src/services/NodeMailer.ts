import * as nodemailer from 'nodemailer'
require('dotenv/config')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.DECOLE_EMAIL_USER, // Basta dizer qual o nosso usuário
    pass: process.env.DECOLE_EMAIL_PASSWORD // e a senha da nossa conta
  }
})
class NodeMailer {
  async sendMail (to: string, subject: string, html: string): Promise<void> {
    const email = {
      from: process.env.DECOLE_EMAIL_USER, // Quem enviou este e-mail
      to: to, // Quem receberá
      subject: subject, // Um assunto bacana :-)
      html: html // O conteúdo do e-mail
    }
    return transporter.sendMail(email, function (err) {
      if (err) {
        console.log(err)
        throw err // Oops, algo de errado aconteceu.
      }
      console.log('Email enviado para ' + email)
    })
  }
}

export default new NodeMailer()
