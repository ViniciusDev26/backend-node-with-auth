import { NextFunction, Request, Response } from 'express';
import passport from '../config/passport';

export default (req, res: Response, next: NextFunction) => {
    passport.authenticate('bearer', {session: false}, (error, user, info) => {
        if(error && error.name === 'JsonWebTokenError'){
            return res.status(401).json({ erro: error.message })
        }

        if(error){
            return res.status(500).json({error: error.message});
        }

        if(!user)
            return res.status(401).json();

        req.user = user;
        req.token = info.scope;
        return next(); 
    })(req, res, next)
}