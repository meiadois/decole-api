import Mail = require("nodemailer/lib/mailer");
import * as nodemailer from 'nodemailer'
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
require('dotenv/config')

const ROOT_PATH = path.join(__dirname, '..')
const TEMPLATES_PATH = path.join(ROOT_PATH, 'templates')

export interface ResetPasswordTemplate {
    username: string;
    token: string;
}

class Transporter {
    email: string;
    service: Mail;

    constructor(email:string, service: Mail){
        this.email = email
        this.service = service
    }
}

interface Transporters {
    [key: string]: Transporter;
 } 
class EmailService {
    public Templates = {
        "ResetPassword" : path.join(TEMPLATES_PATH, 'ResetPassword', 'template.html')
    }
    public Transporters = {
        "NoReply" : new Transporter(
            process.env.DECOLE_NOREPLY_EMAIL,
            this.createTransport(
                process.env.DECOLE_NOREPLY_EMAIL, 
                process.env.DECOLE_NOREPLY_PASSWORD)),

        "MeAjuda" : new Transporter(
            process.env.DECOLE_CONTATO_EMAIL,
            this.createTransport(
                process.env.DECOLE_CONTATO_EMAIL, 
                process.env.DECOLE_CONTATO_PASSWORD)),
    }
    
    
    createTransport(user: string, password: string) {
        return nodemailer.createTransport({
            host: 'mail.decole.app',
            port: 465,
            secure: true,
            auth: {
              user: user, // Basta dizer qual o nosso usuário
              pass: password // e a senha da nossa conta
            }
          })
    }

    renderTemplate (file_path: string, replacements: any) {
        const source = fs.readFileSync(file_path, 'utf-8').toString();
        const template = handlebars.compile(source);
        /*
        const replacements = {
            username: "Umut YEREBAKMAZ"
        };*/
        return template(replacements);

    };

    async sendMail(transporter: Transporter, to: string, subject: string, html: string){
        const email = {
            from: transporter.email, // Quem enviou este e-mail
            to: to, // Quem receberá
            subject: subject, // Um assunto bacana :-)
            html: html // O conteúdo do e-mail
        }

        return transporter.service.sendMail(email, function (err) {
            if (err) {
              console.log(err)
              throw err // Oops, algo de errado aconteceu.
            }
            console.log('Email enviado para ' + email)
        })
    }
    async sendMailTemplate(transporter: Transporter, to: string, subject: string, template_path: string, replacements: ResetPasswordTemplate){
        
        const html = this.renderTemplate (template_path, replacements)
        const email = {
            from: transporter.email, // Quem enviou este e-mail
            to: to, // Quem receberá
            subject: subject, // Um assunto bacana :-)
            html: html // O conteúdo do e-mail
        }

        return transporter.service.sendMail(email, function (err) {
            if (err) {
              console.log(err)
              throw err // Oops, algo de errado aconteceu.
            }
            console.log('Email enviado para ' + email)
        })
    }

    
}
export default new EmailService()
