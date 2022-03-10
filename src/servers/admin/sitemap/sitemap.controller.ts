import { Request, Response } from 'express';
import { SiteMapService } from './sitemap.service';
const { SitemapStream, streamToPromise, SitemapAndIndexStream } = require('sitemap');
const { Readable } = require('stream');
const { resolve, join } = require('path');
const { createGzip } = require('zlib');
const { createWriteStream } = require('fs');
export const genderNewSiteMapController = async (req: Request, res: Response) => {
    const linkSiteMap = [{ url: '/sitemap/tac-gia.xml', changefreq: 'daily', priority: 1 }];
    const stream = new SitemapStream({ hostname: 'https://xemtruyen.vn' });
    const listAuthor = await SiteMapService.getListAllAuthor();
    const writeSteam = createWriteStream(
        join(__dirname, '../../..', 'public', 'sitemap', 'sitemap.xml'),
    );
    Readable.from(linkSiteMap).pipe(stream).pipe(writeSteam);
    writeXmlFileSiteMapAuthor('tac-gia', listAuthor);

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
