import express from 'express';
import { EnvAppConfig } from './common/config';
const app = express();
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.send('hello');
});
app.listen(EnvAppConfig.PORT, () => {
    console.log('App running on port: ' + EnvAppConfig.PORT);
});
