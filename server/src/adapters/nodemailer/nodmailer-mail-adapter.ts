import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "5bb96264407716",
        pass: "2411926bbb6a42"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail(data: SendMailData) {

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Douglas Santos <doug16042@gmail.com>',
        subject: data.subject,
        html: data.body
    })
    }
}