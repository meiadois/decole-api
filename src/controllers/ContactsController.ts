import { Request, Response } from 'express'
import EmailService from '@services/EmailService'

class ContactsController {
  async store (req: Request, res: Response): Promise<Response | void> {
    const { message, email, name, reason } = req.body
    await EmailService.sendMail(EmailService.Transporters.MeAjuda, EmailService.Transporters.MeAjuda.email, `[${reason}]`, `Dados de contato:\nNome: ${name}\nEmail:${email} \n\nMensagem: ${message}`, email)
    return res.status(200).json({ message: 'Contato recebido com sucesso.' })
  }
}

export default new ContactsController()
