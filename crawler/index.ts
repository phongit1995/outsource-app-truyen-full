import mongoose from 'mongoose';
import { EnvAppConfig } from './../src/common/config';
import { getMangaInPageLink, getDetailComic, listCommitNotUpdate } from './getManga';
import { addWaterMarkImage } from './imageResize';
import Redis from 'ioredis';
import kue from 'kue';
import { makeSlug } from '../src/common/text.helper';
const redis = new Redis();
// redis.flushdb((error) => {
//     if (error) {
//         console.log('clear cache redis fail');
//     } else console.log('clear cache redis success');
// });
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
const totalPage = 1008;
//const totalPage = 10;
// for (let i = 1; i <= totalPage; i++) {
//     let job = queue
//         .create('getLinkComic', i)
//         .attempts(3)
//         .ttl(1000 * 10)
//         .save(function (error) {
//             if (!error) console.log(job.id);
//             else console.log(error);
//         });
// }
// queue.process('getLinkComic', 4, function (job, done) {
//     getMangaInPageLink(job.data)
//         .then((data) => {
//             console.log('page ' + job.data + ' Chapter  : ' + data);
//             done();
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// });
// getDetailComic(
//     'https://truyenfull.vn/xuyen-qua-chi-ba-ai-phao-hoi/',
//     '620326f7c645831e707d41b5',
// );
// listCommitNotUpdate().then((data) => {
//     data.forEach((item) => {
//         let job = queue
//             .create('getChapterComic', { url: item.url, id: item._id })
//             .attempts(2)
//             .ttl(10 * 1000)
//             .delay(500)
//             .save(function (error) {
//                 if (!error) console.log(job.id);
//                 else console.log(error);
//             });
//     });
// });
queue.process('getChapterComic', 2, function (job, done) {
    getDetailComic(job.data.url, job.data.id)
        .then((data) => {
            console.log(
                job.data.url +
                    ' : So Page ' +
                    data.lengthPage +
                    '  S??? Chapter : ' +
                    data.Chapter,
            );
            done();
        })
        .catch((error) => {
            console.log(error);
            console.error('L???i URL:' + job.data.url);

            done();
        });
});
console.log(makeSlug('HOANG HO?? LU???N THUY???T - ????M ??EN V?? T???N'));
kue.app.listen(5000);
