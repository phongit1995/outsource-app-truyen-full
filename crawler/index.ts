import mongoose from 'mongoose';
import { EnvAppConfig } from './../src/common/config';
import { getMangaInPageLink } from './getManga';
import Redis from 'ioredis';
import { createClient } from 'redis';
import kue from 'kue';
const redis = new Redis();
redis.flushdb((error) => {
    if (error) {
        console.log('clear cache redis fail');
    } else console.log('clear cache redis success');
});
const queue = kue.createQueue({
    redis: {
        createClientFactory: function () {
            return new Redis();
        },
    },
});
mongoose
    .connect(EnvAppConfig.MONGO_URL)
    .then(() => {
        console.log('connect mongodb success');
    })
    .catch((error: any) => {
        console.log('connect mongodb fail : ', error);
    });

for (let i = 1; i <= 996; i++) {
    let job = queue
        .create('getLinkComic', i)
        .attempts(3)
        .save(function (error) {
            if (!error) console.log(job.id);
            else console.log(error);
        });
}
queue.process('getLinkComic', 4, function (job, done) {
    getMangaInPageLink(job.data)
        .then((data) => {
            console.log('page ' + job.data + ' Chapter  : ' + data);
            done();
        })
        .catch((error) => {
            console.log(error);
        });
});
