import { CrawlerModel } from './../../../models/crawler.model';

export class CrawlerService {
    public static async getCrawlerStatus() {
        const crawlerStatus = await CrawlerModel.findOne();
        if (crawlerStatus) {
            return crawlerStatus;
        }
        return CrawlerModel.create({ status: true });
    }
    public static async updateStatusCrawler(status: boolean) {
        return CrawlerModel.findOneAndUpdate({}, { status });
    }
}
