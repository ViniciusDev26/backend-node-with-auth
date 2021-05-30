import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { encriptPassword } from "../utils/passwordUtils";

class UserController {
    async store(req, res) {
        const {name, email, password} = req.body;
        const userRepository = getRepository(User);

        const user = new User();
        user.name = name;
        user.email = email
        user.password = await encriptPassword(password);

        const newUser = await userRepository.save(user);
        if(newUser){
            return res.status(201).json({message: 'user create with success'})
        }
    }

    async list(req, res) {
        const userRepository = getRepository(User);
        const users = await userRepository.find();

        return res.json(users);
    }
}

export default new UserController();