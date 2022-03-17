import { Request, Response } from 'express';
import { unlinkSync, existsSync, readdirSync, statSync, mkdirSync } from 'fs';
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
const HOST_NAME = 'https://xemtruyen.vn';
export const sitemapIndexController = (req: Request, res: Response) => {
    const folderPath = join(__dirname, '../../..', 'public', 'sitemap');
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
    }
    res.render('admin/sitemap');
};

export const createSiteMapGenderController = (req: Request, res: Response) => {
    const fileName = join(__dirname, '../../..', 'public', 'sitemap', 'sitemap.xml');
    const fileFolder = join(__dirname, '../../..', 'public', 'sitemap');
    if (existsSync(fileName)) {
        unlinkSync(fileName);
    }
    const listFile = readdirSync(fileFolder);
    listFile.sort((a, b) => {
        return (
            statSync(join(__dirname, '../../..', 'public', 'sitemap', a))['mtime'].getTime() -
            statSync(join(__dirname, '../../..', 'public', 'sitemap', b))['mtime'].getTime()
        );
    });
    const links = [];
    listFile.forEach((item) => {
        links.push({ url: '/sitemap/' + item, changefreq: 'daily', priority: 1 });
    });
    const stream = new SitemapStream({ hostname: 'https://xemtruyen.vn' });
    const writeSteam = createWriteStream(fileName);
    Readable.from(links).pipe(stream).pipe(writeSteam);
    writeSteam.on('finish', () => {
        res.send('hello');
    });
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
export const genderSiteMapCategoryController = async (req: Request, res: Response) => {
    const list = await SiteMapService.getListCategory();
    if (list.length == 0) {
        return res.send('Lỗi');
    }
    const filePath = join(__dirname, '../../..', 'public', 'sitemap', 'the-loai.xml');
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
export const genderSiteMapCategoryDetailController = async (req: Request, res: Response) => {
    const list = await SiteMapService.getListCategory();
    if (list.length == 0) {
        return res.send('Lỗi');
    }
    for (let i = 0; i < list.length; i++) {
        await renderMangaByCategory(list[i]);
    }
    res.send('hello');
};
const renderMangaByCategory = async (category: any) => {
    const listManga = await SiteMapService.getMangaByCategory(category.name);
    const filePath = join(
        __dirname,
        '../../..',
        'public',
        'sitemap',
        'the_loai_' + category.slug + '.xml.gz',
    );
    if (existsSync(filePath)) {
        unlinkSync(filePath);
    }
    if (listManga.length == 0) {
        return;
    }
    const links = [];
    listManga.forEach((item) => {
        links.push({ url: item.slug, changefreq: 'daily', priority: 1 });
    });
    const writeSteam = createWriteStream(filePath);
    const stream = new SitemapStream({ hostname: HOST_NAME });
    Readable.from(links).pipe(stream).pipe(createGzip()).pipe(writeSteam);
};

// by chapter
export const genderSiteMapChapterController = async (req: Request, res: Response) => {
    const FILE_NUMBER_ON_FILE = 20000;
    const chapterLength = await SiteMapService.countChapterLength();
    const numberPagePer: number = chapterLength / FILE_NUMBER_ON_FILE;
    const totalPage =
        chapterLength % FILE_NUMBER_ON_FILE == 0 ? numberPagePer : numberPagePer + 1;
    for (let i = 1; i < totalPage; i++) {
        await genderChapterGzFile(i, FILE_NUMBER_ON_FILE);
    }
    res.send('hello');
};
export const genderChapterGzFile = async (page: number, pageSize: number) => {
    const filePath = join(
        __dirname,
        '../../..',
        'public',
        'sitemap',
        'chapter_page_' + page + '.xml.gz',
    );
    if (existsSync(filePath)) {
        unlinkSync(filePath);
    }
    const listChapter = await SiteMapService.getChapterPage(page, pageSize);
    if (listChapter.length == 0) {
        return;
    }
    if (listChapter.length == 0) {
        return;
    }
    const links = [];
    listChapter.forEach((item: any) => {
        links.push({
            url: item.url.replace('https://truyenfull.vn', ''),
            changefreq: 'daily',
            priority: 1,
        });
    });
    if (listChapter.length == 0) {
        return;
    }
    const writeSteam = createWriteStream(filePath);
    const stream = new SitemapStream({ hostname: HOST_NAME });
    Readable.from(links).pipe(stream).pipe(createGzip()).pipe(writeSteam);
};
