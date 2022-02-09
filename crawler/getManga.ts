import request from 'request-promise';
import cheerio from 'cheerio';
import { MangaModel } from './../src/models/manga.model';
import { ChapterModel } from './../src/models/chapter.model';
import userArgent from './userArgent.json';
import { makeSlug } from '../src/common/text.helper';
import { addWaterMarkImage } from './imageResize';
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
export const getDetailComic = async (url: string, mangaId: string) => {
    const options = {
        url: url,
        headers: {
            'User-Agent': getUserAgent(),
        },
    };
    const data = await request(options);
    if (!data) {
        return {
            Chapter: -1,
            lengthPage: -1,
        };
    }
    const $ = cheerio.load(data);
    const title = $(
        '#truyen > div.col-xs-12.col-sm-12.col-md-9.col-truyen-main > div.col-xs-12.col-info-desc > h3',
    ).text();
    const description = $(
        '#truyen > div.col-xs-12.col-sm-12.col-md-9.col-truyen-main > div.col-xs-12.col-info-desc > div.col-xs-12.col-sm-8.col-md-8.desc > div.desc-text',
    ).text();
    const author = $('a[itemprop="author"]').text();
    let status = $('.info >div:last-child>span').text();
    const imageOriginal = $('img[itemprop="image"]').attr('src');

    const rate = $('span[itemprop="ratingValue"]').text();
    const rateCount = $('span[itemprop="ratingCount"]').text();
    let category = [];
    $('.info a[itemprop="genre"]').map(function () {
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
    const image = '/image/' + (await addWaterMarkImage(imageOriginal));
    const ListPromise = Chapter.map((chapter, index) =>
        createNewChapter(mangaId, chapter.url, index + 1, chapter.name),
    );
    const ListChapterDB = await Promise.all(ListPromise);
    const listId = ListChapterDB.map((item) => item._id);
    if (listId.length == 0) {
        await updateMangaInfo(
            mangaId,
            title,
            author,
            category,
            imageOriginal,
            image,
            description,
            status,
            null,
            null,
            rate,
            rateCount,
        );
    } else {
        await updateMangaInfo(
            mangaId,
            title,
            author,
            category,
            imageOriginal,
            image,
            description,
            status,
            listId[listId.length - 1].toString(),
            listId[0].toString(),
            rate,
            rateCount,
        );
    }
    return {
        Chapter: Chapter.length,
        lengthPage: lengthPage,
    };
};
const getListChapterInPageLink = async (url: string, page: string) => {
    const urlPage = url + 'trang-' + page;
    const options = {
        url: urlPage,
        headers: {
            'User-Agent': getUserAgent(),
        },
    };
    const data = await request(options);
    const $ = cheerio.load(data);
    const listChapter = $('.list-chapter>li>a');
    const Chapter = [];
    listChapter.each(function (index, element) {
        const nameChapter = $(this).text();
        const urlChapter = $(this).attr('href');
        Chapter.push({ name: nameChapter, url: urlChapter });
    });

    return Chapter;
};
const createNewChapter = (manga_id: string, url: string, index: number, title: string) => {
    return ChapterModel.create({
        manga: manga_id,
        index: index,
        title: title,
        url: url,
    });
};
const updateMangaInfo = (
    manga_id: string,
    name: string,
    author: string,
    category: string[],
    imageOriginal: string,
    image: string,
    description: string,
    manga_status: string,
    last_chapter: string | null,
    first_chapter: string | null,
    rate,
    rateCount,
) => {
    return MangaModel.findByIdAndUpdate(manga_id, {
        author: author,
        name: name,
        category: category,
        imageOriginal: imageOriginal,
        image: image,
        description: description,
        last_chapter: last_chapter,
        manga_status: manga_status,
        slug: makeSlug(name),
        first_chapter: first_chapter,
        rate,
        rateCount,
        authorSlug: makeSlug(author),
        chapter_update: Date.now(),
    });
};
export const listCommitNotUpdate = () => {
    return MangaModel.find({
        description: { $exists: false },
    }).limit(10000);
};
const getUserAgent = (): string => {
    return userArgent[Math.floor(Math.random() * userArgent.length)];
};
