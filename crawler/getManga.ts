import request from 'request-promise';
import cheerio from 'cheerio';
import { MangaModel } from './../src/models/manga.model';
export const getMangaInPageLink = async (page: number): Promise<void> => {
    const options: any = {
        uri: `https://truyenfull.vn/danh-sach/truyen-moi/trang-${page}/`,
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
        },
    };
    const data: string = await request(options);
    const $ = cheerio.load(data);
    const listUrl: string[] = [];
    const comicInPage = $('.list-truyen .truyen-title >a');
    comicInPage.each(function () {
        listUrl.push($(this).attr('href'));
    });
    const listPromise = listUrl.map((item) => createNewManga(item));
    await Promise.all(listPromise);
};
const createNewManga = (url: string) => {
    return MangaModel.create({ url });
};
