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
    const folderPath = join(__dirname, '../../..', 'public', 'sitemap');
    res.render('admin/sitemap');
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
