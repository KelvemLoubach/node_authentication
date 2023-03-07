import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/User';

dotenv.config();

export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let { email, password } = req.body;

        let hasUser = await User.findOne({where: { email }});

        if(!hasUser) {
            let newUser = await User.create({ email, password });

            const token = JWT.sign(
                {email: newUser.email, password: newUser.password},
                process.env.JWT_SECRET as string,
                {expiresIn: '5h'}
            );

            res.status(201);
            res.json({ id: newUser.id, token});
            return;
        } else {
            res.json({ error: 'E-mail já existe.' });
            return;
        }
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
    return;
    
   
}

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await User.findOne({ 
            where: { email, password }
        });

        if(user) {

            const token = JWT.sign(
                {email: user.email, password: user.password},
                process.env.JWT_SECRET as string,
                {expiresIn: '5h'}
            );
            
           
            return res.json({ token});
            return res.json({ status: true });
       
        }
    }

    res.json({ status: false });
}

export const list = async (req: Request, res: Response) => {
    let users = await User.findAll();
    let list: string[] = [];

    for(let x in users) {
        list.push( users[x].email );
    }

    return res.json({ list });
    
}