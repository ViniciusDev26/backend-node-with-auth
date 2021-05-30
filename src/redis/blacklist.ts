import { createHash } from 'crypto';
import {promisify} from "util"
import { decodeJWT } from '../services/JWT';
import clientRedis from './clientRedis';


const setAsync = promisify(clientRedis.set).bind(clientRedis);
const existsAsync = promisify(clientRedis.exists).bind(clientRedis);

function gerarTokenHash(token) {
    return createHash('sha256').update(token).digest('hex');
}

export default {
    adicionar: async  token => {
        const dataExpiracao: any = decodeJWT(token);
        const tokenHash = gerarTokenHash(token);
        await setAsync(tokenHash, '');
        
        clientRedis.expireat(tokenHash, dataExpiracao.exp);
    },
    verificar: async token => {
        const tokenHash = gerarTokenHash(token);

        const result = await existsAsync(tokenHash);
        return result === 1;
    }
}