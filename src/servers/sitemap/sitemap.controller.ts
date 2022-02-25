import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
export const renderSiteMap = (req: Request, res: Response) => {
    const readStream = createReadStream(join(__dirname, './../../asset/sitemap.html'));
    res.header('Content-Type', 'text/xml; charset=utf-8');
    readStream.pipe(res);
};