import { NextFunction, Request, Response } from 'express';
import passport from '../config/passport';

export default (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', {session: false}, (error, user, info) => {
        if(error !== null){
            return res.status(500).json({error: error.message});
        }

        if(!user)
            return res.status(401).json();

        req.user = user;
        return next(); 
    })(req, res, next)
}