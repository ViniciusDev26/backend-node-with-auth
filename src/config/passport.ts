import passport from "passport";
import { Strategy } from "passport-local";
import BearerStrategy from "passport-http-bearer";
import { getManager } from "typeorm";
import { User } from "../entities/User";
import { verifyPassword } from "../utils/passwordUtils";
import { verifyBlackList, verifyJWT } from "../services/JWT";

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, async (email, password, done) => {
    const entityManager = getManager();

    try {
        const user = await entityManager.findOne(User, {email}, {select: ['id', 'name', 'email', 'password']});

        if(!user){
            throw new Error('Usuario não existe');
        }

        const correctPassword = await verifyPassword(password, user.password);
        if(!correctPassword){
            throw new Error('Email ou senha inválido')
        }

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            name2: user.name,
            email: user.email
        }

        return done(null, userWithoutPassword);
    }catch(error){
        return done(error);
    }
}));

passport.use(new BearerStrategy.Strategy(async (token, done) => {
    const entityManager = getManager();

    try {
        await verifyBlackList(token);
        const payload = verifyJWT(token);
        const user = await entityManager.findOne(User, payload.id);
        done(null, user, {scope: token})
    }catch(error) {
        done(error)
    }
}))

export default passport;