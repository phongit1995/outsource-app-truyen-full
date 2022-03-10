import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
export const renderSiteMap = (req: Request, res: Response) => {
    const readStream = createReadStream(join(__dirname, './../../public/sitemap/sitemap.xml'));
    res.header('Content-Type', 'text/xml; charset=utf-8');
    readStream.pipe(res);
};
