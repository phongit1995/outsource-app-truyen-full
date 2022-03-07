import { Request, Response } from 'express';
import { CrawlerService } from './crawler.service';

export const crawlerController = async (req: Request, res: Response) => {
    const getCrawlerStatus = await CrawlerService.getCrawlerStatus();
    console.log(getCrawlerStatus);
    return res.render('admin/crawler', {
        getCrawlerStatus,
    });
};
export const crawlerUpdateStatus = async (req: Request, res: Response) => {
    const { status } = req.body;
    await CrawlerService.updateStatusCrawler(status);
    res.status(200).json({ message: 'success' });
};
