import { Request, Response} from 'express';
import nodemailer from 'nodemailer';

export const contato = async (req: Request, res:Response)=>{


    //Configurando o trasnporte
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "kelvem21@gmail.com",
          pass: "programacaojS21"
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