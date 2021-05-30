type User = {
    id: number;
    name: string;
    email: string;
}

import { decode, JsonWebTokenError, sign, verify } from 'jsonwebtoken';
import blacklist from '../redis/blacklist';

export const createJWT = (user: User) => {
    const payload = {
        id: user.id
    }

    const token = sign(payload, process.env.SECRET, {
        expiresIn: '1h'
    });
    return token;
}

export const verifyJWT = (token: string) => {
    return verify(token, process.env.SECRET);;
}

export const decodeJWT = (token: string) => {
    return decode(token);
}

export const verifyBlackList = async (token: string) => {
    const tokenBlackList = await blacklist.verificar(token);
    if(tokenBlackList){
        throw new JsonWebTokenError('Token invalido');
    }
}