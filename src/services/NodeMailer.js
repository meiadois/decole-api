var nodemailer = require('nodemailer');
require('dotenv/config');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.DECOLE_EMAIL_USER, // Basta dizer qual o nosso usuário
        pass: process.env.DECOLE_EMAIL_PASSWORD            // e a senha da nossa conta
    }
});
module.exports = {
    async sendMail(to, subject, html) {
        var email = {
            from: process.env.DECOLE_EMAIL_USER, // Quem enviou este e-mail
            to: to, // Quem receberá
            subject: subject,  // Um assunto bacana :-) 
            html: html // O conteúdo do e-mail
        };
        return transporter.sendMail(email, function (err, info) {
            if (err)
                throw err; // Oops, algo de errado aconteceu.
            return true;
            console.log('Email enviado para ' + email);
        });
    }
}
