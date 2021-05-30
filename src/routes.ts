import { Router } from 'express';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import passportBearerStrategy from './middlewares/passportBearerStrategy';
import passportLocalStrategy from './middlewares/passportLocalStrategy';

const route = Router();

route.post('/auth', passportLocalStrategy, AuthController.login);
route.get('/logout', passportBearerStrategy, AuthController.logout);

route.get('/user', passportBearerStrategy, UserController.list);
route.post('/user', UserController.store);

export default route;