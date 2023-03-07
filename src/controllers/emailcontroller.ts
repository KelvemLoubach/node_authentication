import { Request, Response} from 'express';
import nodemailer from 'nodemailer';

export const contato = async (req: Request, res:Response)=>{


    //Configurando o trasnporte
    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e0ffde12833737",
          pass: "14cd49204e9fda"
        }
      });
      //Configurando a mensagem
      let message = {
        from: req.body.from,
        to: req.body.to as string[],
        subject: req.body.subject,
        html: req.body.html,
        text: req.body.text
      };
      //Configurando o envio
      let info = await transport.sendMail(message);

     res.json({message});
}