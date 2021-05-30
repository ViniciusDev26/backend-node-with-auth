require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import helmet from 'helmet';
import route from './routes';

const app = express();

createConnection().then(() => {
    app.use(morgan('dev'));
    app.use(cors())
    app.use(express.json());
    app.use(helmet());
    app.use(route);
}).catch(err => {
    console.log(err);
})

const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
