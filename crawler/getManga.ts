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
export const getDetailComic = async (url: string, id: string) => {
    const options = {
        url: url,
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
        },
    };
    const data = await request(options);
    const $ = cheerio.load(data);
    const title = $(
        '#truyen > div.col-xs-12.col-sm-12.col-md-9.col-truyen-main > div.col-xs-12.col-info-desc > h3',
    ).text();
    const description = $(
        '#truyen > div.col-xs-12.col-sm-12.col-md-9.col-truyen-main > div.col-xs-12.col-info-desc > div.col-xs-12.col-sm-8.col-md-8.desc > div.desc-text',
    ).text();
    const author = $('a[itemprop="author"]').text();
    let status = $('.info >div:last-child>span').text();
    const image = $('img[itemprop="image"]').attr('src');
    let category = [];
    $('a[itemprop="genre"]').map(function () {
        category.push($(this).text());
    });
    status = status == 'Đang ra' ? '0' : (1).toString();
    const listChapter = $('.list-chapter>li>a');
    let Chapter = [];
    const pagination = $('.pagination.pagination-sm').length;
    let lengthPage: number = 0;
    const arrayPage = [];
    if (pagination > 0) {
        if ($('.pagination.pagination-sm >li>a').length < 5) {
            lengthPage = $('.pagination.pagination-sm >li>a').length;
        } else {
            const listLength = $('.pagination.pagination-sm >li:not(.page-nav)>a')
                .last()
                .attr('href');
            let maxChapter = listLength.slice(0, listLength.lastIndexOf('/'));
            lengthPage = +maxChapter.slice(maxChapter.lastIndexOf('-') + 1, maxChapter.length);
        }
        for (let i = 1; i <= lengthPage; i++) {
            arrayPage.push(i);
        }
        let ListPromise = arrayPage.map((item) => getListChapterInPageLink(url, item));
        let listLink = await Promise.all(ListPromise);
        Chapter = Chapter.concat(...listLink);
    } else {
        listChapter.each(function (index, element) {
            const nameChapter = $(this).text();
            const urlChapter = $(this).attr('href');
            Chapter.push({ name: nameChapter, url: urlChapter });
        });
    }
    // const ListPromise = Chapter.map((chapter, index) =>
    //     createNewChapter(manga_id, chapter.url, index + 1, chapter.name),
    // );
    const ListChapterDB = await Promise.all(ListPromise);
    const listId = ListChapterDB.map((item) => item._id);
    return {
        Chapter: Chapter.length,
        lengthPage: lengthPage,
    };
};
