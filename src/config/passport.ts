import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { User, UserInstance } from '../models/User'
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const notAuthoriz = {status:401,message:'Não autorizado!, middleware'};

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};

passport.use(new JWTstrategy(options, async (plyload, done) => {
    const user:UserInstance|null = await User.findOne({where:{email:plyload.email}});
    console.log(plyload)
    console.log(user, 'user middleware')
   return user ? done(null, user) : done(notAuthoriz, false);
}));

export const privateRouter = (req:Request,res:Response,next:NextFunction) =>{

    passport.authenticate('jwt', (err: any, user:UserInstance|null) =>{
        return user ? next() : next(notAuthoriz);
    })(req,res,next);

};

export default passport;















//Configuramos a nossa Stratrgy
// const notAuthorized = { status: 401, message: 'Não autorizado!!!!!' };

// passport.use(new BasicStrategy(async (email, password, done) => {
//     if (email && password) {
//         const user: UserInstance | null = await User.findOne({
//             where: { email, password }
//         })
//         if (user) {

//             return done(null, user);
//         }
//     }
//     return done(notAuthorized, false)
// }));



// export const privateRouter = (req: Request, res: Response, next: NextFunction) => {
//     passport.authenticate('basic', (err: null, user: UserInstance | null) => {
//         console.log(user);
//         console.log(err,'erro aqui')
//         user ? next() : next(notAuthorized);
//     })(req, res,next);
// };
