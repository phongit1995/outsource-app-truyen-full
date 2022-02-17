import express from 'express';
import { EnvAppConfig } from './common/config';
import service from './servers';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
const app = express();
app.use(
    express.static(path.join(__dirname, 'public'), {
        maxAge: 1209600,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
