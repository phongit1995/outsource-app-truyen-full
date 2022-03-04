import mongoose from 'mongoose';
import { EnvAppConfig } from './../src/common/config';
import request from 'request-promise';
import cheerio from 'cheerio';
import { MangaModel, Manga } from './../src/models/manga.model';
import { ChapterModel } from './../src/models/chapter.model';
import { xorBy } from 'lodash';
import nodeSchedule from 'node-schedule';
mongoose
    .connect(EnvAppConfig.MONGO_URL)
    .then(() => {
        console.log('connect mongodb success');
    })
    .catch((error: any) => {
        console.log('connect mongodb fail : ', error);
    });
const URL_WEBSITE = 'https://truyenfull.vn/';
const getListNewUrlManga = async (): Promise<string[]> => {
    const options = {
        method: 'get',
        url: URL_WEBSITE,
    };
    const data = await request(options);
    let listLink: string[] = [];
    const $ = cheerio.load(data);
    $(
        '#list-index > div.list.list-truyen.list-new.col-xs-12.col-sm-12.col-md-8.col-truyen-main > div[class=row] > div.col-xs-9.col-sm-6.col-md-5.col-title > h3 > a',
    ).each(function () {
        listLink.push($(this).attr('href'));
    });
    return listLink;
};
const getListMangaUpdate = (listLink: string[]) => {
    return MangaModel.find({
        url: {
            $in: listLink,
        },
    });
};
const getListChapterInPageLink = async (
    url: string,
    page: number,
): Promise<Array<{ name?: string; url?: string; index?: number }>> => {
    const options = {
        url: url + 'trang-' + page,
        method: 'get',
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
        },
    };
    const data = await request(options);
    const $ = cheerio.load(data);
    const listChapter = $('.list-chapter>li>a');
    let Chapter = [];
    listChapter.each(function (index, element) {
        const nameChapter = $(this).text();
        const urlChapter = $(this).attr('href');
        Chapter.push({ name: nameChapter, url: urlChapter });
    });
    return Chapter;
};
const getListAllChapterByUrl = async (url: string) => {
    const options = {
        url: url,
        method: 'get',
    };
    const data = await request(options);
    const $ = cheerio.load(data);
    let Chapter: Array<{ name?: string; url?: string; index?: number }> = [];
    const pagination: number = $('.pagination.pagination-sm').length;
    let lengthPage: number = 0;
    let arrayPage: number[] = [];
    if (pagination > 0) {
        if ($('.pagination.pagination-sm >li>a').length < 5) {
            lengthPage = $('.pagination.pagination-sm >li>a').length;
        } else {
            const listLength = $('.pagination.pagination-sm >li:not(.page-nav)>a')
                .last()
                .attr('href');
            let maxChapter = listLength.slice(0, listLength.lastIndexOf('/'));
            lengthPage = parseInt(
                maxChapter.slice(maxChapter.lastIndexOf('-') + 1, maxChapter.length),
            );
        }
        for (let i = 1; i <= lengthPage; i++) {
            arrayPage.push(i);
        }
        let ListPromise = arrayPage.map((item) => getListChapterInPageLink(url, item));
        let listLink = await Promise.all(ListPromise);
        Chapter = Chapter.concat(...listLink);
    } else {
        $('.list-chapter>li>a').each(function () {
            const nameChapter = $(this).text();
            const urlChapter = $(this).attr('href');
            Chapter.push({ name: nameChapter, url: urlChapter });
        });
    }
    Chapter = Chapter.map((item, index) => {
        item.index = index + 1;
        return item;
    });
    return Chapter;
};
const updateMangaInfo = async (manga: Manga) => {
    const listChapterOnWeb = await getListAllChapterByUrl(manga.url);
    const listChapterInDb = await ChapterModel.find({ manga: manga._id }).sort({ index: -1 });
    const listNotUpdate = xorBy(listChapterOnWeb, listChapterInDb, 'url');
    if (listNotUpdate.length == 0) {
        console.log('url này không có cập nhật mới :', manga.url);
        return null;
    }
    const chapterMangaPromiseUpdate = listNotUpdate.map((chapter) => {
        return ChapterModel.create({
            manga: manga._id,
            url: chapter.url,
            index: chapter.index,
            title: chapter.name,
        });
    });
    const resultUpdate = await Promise.all(chapterMangaPromiseUpdate);
    await MangaModel.updateOne(
        { _id: manga._id },
        {
            last_chapter: resultUpdate[resultUpdate.length - 1]._id,
            chapter_update: Date.now(),
            totalChapter: listChapterOnWeb.length,
        },
    );
    console.log('Update Success : ' + resultUpdate.length + '  Url : ' + manga.url);
};

const cronJob = async () => {
    const listLink = await getListNewUrlManga();
    console.log('LIST URL NEED UPDATE : ' + listLink.length);
    const listMangaUpdate = await getListMangaUpdate(listLink);
    console.log('listMangaUpdate', listMangaUpdate.length);
    await updateMangaInfo(listMangaUpdate[0]);
    for (let i = 0; i < listMangaUpdate.length; i++) {
        try {
            await updateMangaInfo(listMangaUpdate[i]);
        } catch (error) {
            console.log(error);
        }
    }
};
nodeSchedule.scheduleJob('0 */2 * * *', cronJob);
