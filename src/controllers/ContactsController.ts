import { Request, Response, NextFunction } from "express";
import EmailService from "@services/EmailService";

class ContactsController {
    async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { message, email, name, reason } = req.body
        await EmailService.sendMail(EmailService.Transporters.MeAjuda, "guiscunha@gmail.com", reason, `${name}: ${email} \n ${message}`)
        return res.status(200).json({ message: "Contato recebido com sucesso."})
    }
}

export default new ContactsController()