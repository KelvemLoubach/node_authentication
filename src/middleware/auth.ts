import { Request, Response, NextFunction} from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { buffer } from 'stream/consumers';
import { User } from '../models/User';

dotenv.config();

export const Auth = {

    private:  async (req: Request, res: Response, next: NextFunction)=>{

        if(req.headers.authorization){
            let [typeAuth, token ] = req.headers.authorization.split(' ');
           
            if(typeAuth === 'Bearer'){
                try{
                   JWT.verify( token,process.env.JWt_SECRET as string);
                   next();
                } 
                catch (err) {
                    console.log(err)
                    return res.status(401).json({error: 'Não autorizado!'});
                }               
            } else {
                return res.status(401).json({error: 'Header divergente!'});
            }        
        } else {
            return res.status(401).json({error: 'Headers inexistentes!'});
        }      
    } 
};






        //Processo de autenticação e autorização usando o padrão Basic.
        // if(req.headers.authorization){

        //     let hash:string =  req.headers.authorization.substring(6);
        //     let decoded:string = Buffer.from(hash, 'base64').toString();
        //     let dataAutorization: string[] = decoded.split(':');

        //     if(dataAutorization.length === 2 ){
        //         let user = await User.findOne({where:{
        //             email: dataAutorization[0],
        //             password: dataAutorization[1]
        //         }});
 
        //         if(user){
        //             auth = true;
        //             next();
        //         } else {
        //             res.status(403);
        //             res.json({Error: 'Não autorizado!'})
        //         }
        //     }         
        // }  
