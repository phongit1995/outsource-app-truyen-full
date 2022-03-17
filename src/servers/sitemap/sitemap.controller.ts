import { Request, Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
export const renderSiteMap = (req: Request, res: Response) => {
    console.log('hello');
    const pathSiteMap = join(__dirname, './../../public/sitemap/sitemap.xml');
    if (!existsSync(pathSiteMap)) {
        return res.send('Chưa Có sitemap Vui lòng Tạo');
    }
    const readStream = createReadStream(pathSiteMap);
    res.header('Content-Type', 'text/xml; charset=utf-8');
    readStream.pipe(res);
};
export const getSiteMapController = (req: Request, res: Response) => {
    console.log(req.params.name);
    res.send('hello');
};
