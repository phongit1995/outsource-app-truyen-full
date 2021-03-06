import { Request, Response } from 'express';
import { mangaService } from '../manga/manga.service';
import ChapterService from './chapter.service';
import { cacheService } from './../../common/cache.helper';

export const detailChapterController = async (req: Request, res: Response) => {
    const { manga, chapter } = req.params;
    const keyCache: string = 'CACHE_CHAPTER_DETAIL' + manga + chapter;
    const dataCache = cacheService.get(keyCache);
    if (dataCache) {
        return res.render('chapter/index', dataCache as object);
    }
    const mangaDetail = await mangaService.findBySlug(manga);
    if (!mangaDetail) {
        return res.redirect('/');
    }
    const chapterDetail = await ChapterService.getChapterBySlug(
        mangaDetail._id.toString(),
        chapter,
    );
    if (!chapterDetail) {
        return res.redirect('/');
    }
    if (!chapterDetail.content) {
        let content = await ChapterService.getContentChapter(chapterDetail.url);
        chapterDetail.content = content;
        chapterDetail.save();
    }
    const dataRender = {
        manga: mangaDetail,
        chapter: chapterDetail,
    };
    cacheService.set(keyCache, dataRender, 60 * 60 * 12);
    return res.render('chapter/index', dataRender);
};
export const getNextChapter = async (req: Request, res: Response) => {
    const keyCache = 'KEY_CACHE_NEXT_CHAPTER' + req.params.chapter;
    const dataCache = cacheService.get(keyCache);
    if (dataCache) {
        return res.status(200).json(dataCache);
    }
    const chapterDetail = await ChapterService.getDetailChapterById(req.params.chapter);
    if (!chapterDetail) {
        return res.status(400).json({ message: 'not found' });
    }
    const [prevChapter, nextChapter, manga] = await Promise.all([
        ChapterService.getChapterByMangaAndIndex(
            chapterDetail.manga.toString(),
            chapterDetail.index - 1,
        ),
        ChapterService.getChapterByMangaAndIndex(
            chapterDetail.manga.toString(),
            chapterDetail.index + 1,
        ),
        mangaService.getMangaById(chapterDetail.manga.toString()),
    ]);
    cacheService.set(
        keyCache,
        {
            prevChapter,
            nextChapter,
            manga,
        },
        60 * 60,
    );
    return res.status(200).json({
        prevChapter,
        nextChapter,
        manga,
    });
};
export const getListChapter = async (req: Request, res: Response) => {
    const keyCache = 'KEY_CACHE_LIST_CHAPTER' + req.params.manga;
    const dataCache = cacheService.get(keyCache);
    if (dataCache) {
        return res.status(200).json(dataCache);
    }
    const listChapter = await ChapterService.getListChapter(req.params.manga);
    cacheService.set(keyCache, listChapter, 60 * 30);
    return res.status(200).json(listChapter);
};
