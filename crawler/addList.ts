import request from 'request-promise';
import cheerio from 'cheerio';
import { makeSlug } from '../src/common/text.helper';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import kue from 'kue';
import { EnvAppConfig } from './../src/common/config';
type ListTypeT = {
    name: string;
    slug: string;
};
import { MangaModel } from './../src/models/manga.model';
mongoose
    .connect(EnvAppConfig.MONGO_URL)
    .then(() => {
        console.log('connect mongodb success');
    })
    .catch((error: any) => {
        console.log('connect mongodb fail : ', error);
    });
const listType: ListTypeT[] = [
    {
        name: 'Đam Mỹ H Văn',
        slug: makeSlug('Đam Mỹ H Văn'),
    },
    {
        name: 'Đàm mỹ hài',
        slug: makeSlug('Đàm mỹ hài'),
    },
    {
        name: 'Đam Mỹ Hay',
        slug: makeSlug('Đam Mỹ Hay'),
    },
    {
        name: 'Đam Mỹ Sắc',
        slug: makeSlug('Đam Mỹ Sắc'),
    },
    {
        name: 'Kiếm hiệp hay',
        slug: makeSlug('Kiếm hiệp hay'),
    },
    {
        name: 'Ngôn Tình Hài',
        slug: makeSlug('Ngôn Tình Hài'),
    },
    {
        name: 'Ngôn tình hay',
        slug: makeSlug('Ngôn tình hay'),
    },
    {
        name: 'Ngôn Tình Ngược',
        slug: makeSlug('Ngôn Tình Ngược'),
    },
    {
        name: 'Ngôn Tình Sắc',
        slug: makeSlug('Ngôn Tình Sắc'),
    },
    {
        name: 'Ngôn tình Sủng',
        slug: makeSlug('Ngôn tình Sủng'),
    },
    {
        name: 'Tiên hiệp hay',
        slug: makeSlug('Tiên hiệp hay'),
    },
];
import userArgent from './userArgent.json';
const getUserAgent = (): string => {
    return userArgent[Math.floor(Math.random() * userArgent.length)];
};
export const getListUrlGet = async () => {
    let resultPage: { url: string; slug: string }[] = [];
    for (let i = 0; i < listType.length; i++) {
        const lengthPage = await getPageByType(listType[i].slug);
        resultPage = resultPage.concat(
            [...Array(lengthPage)].map((item, index) => {
                return {
                    url:
                        'https://truyenfull.vn/danh-sach/' +
                        listType[i].slug +
                        '/trang-' +
                        (index + 1),
                    slug: listType[i].slug,
                };
            }),
        );
    }
    return resultPage;
};
export const getPageByType = async (type: string): Promise<number> => {
    const url = 'https://truyenfull.vn/danh-sach/' + type;
    console.log(url);
    const options = {
        method: 'get',
        url,
        headers: {
            'User-Agent': getUserAgent(),
        },
    };
    const data = await request(options);
    const $ = cheerio.load(data);
    let lengthPage: number = 0;
    if ($('.pagination.pagination-sm >li>a').length < 5) {
        lengthPage = $('.pagination.pagination-sm >li>a').length;
    } else {
        const listLength = $('.pagination.pagination-sm >li:not(.page-nav)>a')
            .last()
            .attr('href');
        let maxChapter = listLength.slice(0, listLength.lastIndexOf('/'));
        lengthPage = +maxChapter.slice(maxChapter.lastIndexOf('-') + 1, maxChapter.length);
    }
    return lengthPage;
};

const updateMangaType = async (url: string, slug: string) => {
    const options = {
        method: 'get',
        url,
        headers: {
            'User-Agent': getUserAgent(),
        },
    };
    const data = await request(options);
    const $ = cheerio.load(data);
    const listUrl: string[] = [];
    const comicInPage = $('.list-truyen .truyen-title >a');
    comicInPage.each(function () {
        listUrl.push($(this).attr('href'));
    });
    if (listUrl.length == 0) {
        return;
    }
    const listPromise = listUrl.map((item) => updateManga(item, slug));
    let result = await Promise.all(listPromise);
    console.log('update success : ' + result.length);
};
const updateManga = async (url: string, slug: string) => {
    return MangaModel.findOneAndUpdate(
        {
            url,
        },
        {
            $addToSet: {
                list: slug,
            },
        },
    );
};
//getListUrlGet();
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
getListUrlGet().then((data) => {
    data.forEach((item) => {
        let job = queue
            .create('updateListManga', { url: item.url, slug: item.slug })
            .attempts(2)
            .ttl(10 * 1000)
            .delay(500)
            .save(function (error) {
                if (!error) console.log(job.id);
                else console.log(error);
            });
    });
});
queue.process('updateListManga', 2, function (job, done) {
    updateMangaType(job.data.url, job.data.slug)
        .then((data) => {
            console.log(job.data.url + ' : So Page ' + data);
            done();
        })
        .catch((error) => {
            console.log(error);
            console.error('Lỗi URL:' + job.data.url);

            done();
        });
});
