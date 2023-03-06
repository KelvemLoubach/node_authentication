import { Request, Response, NextFunction} from 'express';
import { buffer } from 'stream/consumers';

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction)=>{
        let auth = false;

        //Verification
        if(req.headers.authorization){
            //console.log(getHash)
            let hash:string =  req.headers.authorization.substring(6);
            console.log(hash)
            let encoded:string = Buffer.from(hash, 'base64').toString();
            console.log(encoded)

        }
     

        if(auth){
            next();
        } else {
            res.status(403);
            res.json({error: 'Não autorizado!'})
        }
    }
};
