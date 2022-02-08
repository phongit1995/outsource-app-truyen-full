import express from 'express';
import { EnvAppConfig } from './common/config';
import service from './servers';
import path from 'path';
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', service);
app.listen(EnvAppConfig.PORT, () => {
    console.log('App running on port: ' + EnvAppConfig.PORT);
});
