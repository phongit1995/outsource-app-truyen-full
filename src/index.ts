import express from 'express';
import { EnvAppConfig } from './common/config';
import service from './servers';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
const app = express();
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(
    express.static(path.join(__dirname, 'public'), {
        maxAge: 3600000,
    }),
);
mongoose
    .connect(EnvAppConfig.MONGO_URL)
    .then(() => {
        console.log('connect mongodb success');
    })
    .catch((error: any) => {
        console.log('connect mongodb fail : ', error);
    });
app.use('/', service);
app.listen(EnvAppConfig.PORT, () => {
    console.log('App running on port: ' + EnvAppConfig.PORT);
});
