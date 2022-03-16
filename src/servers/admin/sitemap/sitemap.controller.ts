import { Request, Response } from 'express';
import { createReadStream, unlinkSync, existsSync } from 'fs';
import { SiteMapService } from './sitemap.service';
const {
    SitemapStream,
    SitemapAndIndexStream,
    lineSeparatedURLsToSitemapOptions,
} = require('sitemap');
const { Readable } = require('stream');
const { resolve, join } = require('path');
const { createGzip } = require('zlib');
const { createWriteStream } = require('fs');
const numberSitemapInPage = 10000;
export const sitemapIndexController = (req: Request, res: Response) => {
    res.render('admin/sitemap');
};
export const genderNewSiteMapController = async (req: Request, res: Response) => {
    const stream = new SitemapStream({ hostname: 'https://xemtruyen.vn' });
    const [listAuthor, list, categoryList] = await Promise.all([
        SiteMapService.getListAllAuthor(),
        SiteMapService.getList(),
        SiteMapService.getListCategory(),
    ]);
    writeXmlFileSiteMapAuthor('tac-gia', listAuthor);
    writeXmlFileSiteMapCategory('the-loai', categoryList);
    writeXmlFileSiteMapList('danh-muc', list);
    const linkSiteMap = [
        { url: '/sitemap/tac-gia.xml', changefreq: 'daily', priority: 1 },
        { url: '/sitemap/the-loai.xml', changefreq: 'daily', priority: 1 },
        { url: '/sitemap/danh-muc.xml', changefreq: 'daily', priority: 1 },
    ];

    const listData = [];
    const mangaList = await SiteMapService.getListManga();
    const fsStream = createWriteStream(
        join(__dirname, '../../..', 'public', 'sitemap', `data.txt`),
        {
            flags: 'a',
            encoding: 'utf8',
        },
    );
    mangaList.forEach((manga) => {
        fsStream.write(`{url: '/${manga.slug},changefreq': 'daily',priority: 1}\n`);
    });
    fsStream.end();
    // mangaList.forEach((manga) => {
    //     listData.push({
    //         url: '/' + manga.slug,
    //         changefreq: 'daily',
    //         priority: 1,
    //     });
    // });
    // listChapter.forEach((chapter: any) => {
    //     listData.push({
    //         url: '/' + chapter.manga.slug + '/' + chapter.slug,
    //         changefreq: 'daily',
    //         priority: 1,
    //     });
    // });
    const sms = new SitemapAndIndexStream({
        limit: numberSitemapInPage, // defaults to 45k
        lastmodDateOnly: false, // print date not time
        getSitemapStream: (i) => {
            const sitemapStream = new SitemapStream({ hostname: 'https://xemtruyen.com' });
            const path = join(__dirname, '../../..', 'public', 'sitemap', `/sitemap-${i}.xml`);
            const ws = sitemapStream
                .pipe(createGzip()) // compress the output of the sitemap
                .pipe(createWriteStream(resolve(path + '.gz'))); // write it to sitemap-NUMBER.xml
            return [
                new URL(path, 'https://xemtruyen.vn/sitemap/').toString(),
                sitemapStream,
                ws,
            ];
        },
    });
    lineSeparatedURLsToSitemapOptions(
        createReadStream(join(__dirname, '../../..', 'public', 'sitemap', `data.txt`)),
    )
        .pipe(sms)
        .pipe(createGzip())
        .pipe(createWriteStream(resolve('./sitemap-index.xml.gz')));
    const numberFile = listData.length / numberSitemapInPage;
    for (let i = 0; i <= numberFile; i++) {
        linkSiteMap.push({
            url: '/sitemap' + `/sitemap-${i}.xml.gz`,
            changefreq: 'daily',
            priority: 1,
        });
    }
    //Readable.from(linkSiteMap).pipe(stream).pipe(writeSteam);
    res.send('success');
};
const writeXmlFileSiteMapAuthor = (name: string, data: any) => {
    const links = [];
    data.forEach((item) => {
        links.push({ url: '/tac-gia/' + item.slug, changefreq: 'daily', priority: 1 });
    });
    const stream = new SitemapStream({ hostname: 'https://xemtruyen.vn' });
    const writeSteam = createWriteStream(
        join(__dirname, '../../..', 'public', 'sitemap', name + '.xml'),
    );
    Readable.from(links).pipe(stream).pipe(writeSteam);
};
const writeXmlFileSiteMapCategory = (name: string, data: any) => {
    const links = [];
    data.forEach((item) => {
        links.push({ url: '/the-loai/' + item.slug, changefreq: 'daily', priority: 1 });
    });
    const stream = new SitemapStream({ hostname: 'https://xemtruyen.vn' });
    const writeSteam = createWriteStream(
        join(__dirname, '../../..', 'public', 'sitemap', name + '.xml'),
    );
    Readable.from(links).pipe(stream).pipe(writeSteam);
};
const writeXmlFileSiteMapList = (name: string, data: any) => {
    const links = [];
    data.forEach((item) => {
        links.push({ url: '/danh-muc/' + item.slug, changefreq: 'daily', priority: 1 });
    });
    const stream = new SitemapStream({ hostname: 'https://xemtruyen.vn' });
    const writeSteam = createWriteStream(
        join(__dirname, '../../..', 'public', 'sitemap', name + '.xml'),
    );
    Readable.from(links).pipe(stream).pipe(writeSteam);
};
export const genderSiteMapListController = async (req: Request, res: Response) => {
    const list = await SiteMapService.getList();
    if (list.length == 0) {
        return res.send('Lỗi');
    }
    const filePath = join(__dirname, '../../..', 'public', 'sitemap', 'danh-sach.xml');
    if (existsSync(filePath)) {
        unlinkSync(filePath);
    }
    const links = [];
    list.forEach((item) => {
        links.push({ url: '/danh-muc/' + item.slug, changefreq: 'daily', priority: 1 });
    });
    const stream = new SitemapStream({ hostname: 'https://xemtruyen.vn' });
    const writeSteam = createWriteStream(filePath);
    Readable.from(links).pipe(stream).pipe(writeSteam);
    writeSteam.on('finish', () => {
        res.send('hello');
    });
};
export const genderSiteMapAuthorController = async (req: Request, res: Response) => {
    const list = await SiteMapService.getListAllAuthor();
    if (list.length == 0) {
        return res.send('Lỗi');
    }
    const filePath = join(__dirname, '../../..', 'public', 'sitemap', 'tac-gia.xml');
    if (existsSync(filePath)) {
        unlinkSync(filePath);
    }
    const links = [];
    list.forEach((item) => {
        links.push({ url: '/tac-gia/' + item.slug, changefreq: 'daily', priority: 1 });
    });
    const stream = new SitemapStream({ hostname: 'https://xemtruyen.vn' });
    const writeSteam = createWriteStream(filePath);
    Readable.from(links).pipe(stream).pipe(writeSteam);
    writeSteam.on('finish', () => {
        res.send('hello');
    });
};
