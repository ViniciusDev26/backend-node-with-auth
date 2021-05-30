import blacklist from "../redis/blacklist";
import { createJWT, verifyBlackList } from "../services/JWT";

class AuthController {
    login(req, res) {
        const token = createJWT(req.user);

        console.log(req.user);
        res.set('Authorization', token);
        return res.status(200).json({user: req.user});
    }

    async logout(req, res) {
        try {
            const token = req.token;
            await verifyBlackList(token);
            await blacklist.adicionar(token);
            
            return res.status(204).send();
        }catch(error) {
            return res.json(error.message);
        }
    }
}

export default new AuthController();