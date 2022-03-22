const { SitemapStream, streamToPromise, SitemapAndIndexStream } = require('sitemap');
const { Readable } = require('stream');
const { resolve, join } = require('path');
const { createGzip } = require('zlib');
const { createWriteStream } = require('fs');
import { MangaModel } from './../src/models/manga.model';
import mongoose from 'mongoose';
import { EnvAppConfig } from './../src/common/config';
mongoose
    .connect(EnvAppConfig.MONGO_URL)
    .then(() => {
        console.log('connect mongodb success');
    })
    .catch((error: any) => {
        console.log('connect mongodb fail : ', error);
    });
const renderSiteMap = () => {
    const links = [{ url: '/page-1/', changefreq: 'daily', priority: 0.3 }];
    const stream = new SitemapStream({ hostname: 'https://blogema.org' });
    return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
        console.log(data.toString()),
    );
};
// renderSiteMap();
const renderSiteMapLarge = async (data: any) => {};
const getData = async () => {
    let arrayOfSitemapItems = [];
    const listManga = await MangaModel.find({ crawled: true });
    listManga.forEach((item) => {
        arrayOfSitemapItems.push({
            url: `/${item.slug}`,
            changefreq: 'daily',
        });
    });
    const sms = new SitemapAndIndexStream({
        limit: 10000, // defaults to 45k
        lastmodDateOnly: false, // print date not time
        // SitemapAndIndexStream will call this user provided function every time
        // it needs to create a new sitemap file. You merely need to return a stream
        // for it to write the sitemap urls to and the expected url where that sitemap will be hosted
        getSitemapStream: (i) => {
            const sitemapStream = new SitemapStream({ hostname: 'https://xemtruyen.com' });
            // if your server automatically serves sitemap.xml.gz when requesting sitemap.xml leave this line be
            // otherwise you will need to add .gz here and remove it a couple lines below so that both the index
            // and the actual file have a .gz extension
            const path = join(__dirname, 'sitemap', `/sitemap-${i}.xml`);
            const ws = sitemapStream
                .pipe(createGzip()) // compress the output of the sitemap
                .pipe(createWriteStream(resolve(path + '.gz'))); // write it to sitemap-NUMBER.xml

            return [new URL(path, 'https://blogema.org/sitemap/').toString(), sitemapStream, ws];
        },
    });
    arrayOfSitemapItems.forEach((item) => sms.write(item));

    sms.end(); // necessary to let it know you've got nothing else to write
};
getData();
