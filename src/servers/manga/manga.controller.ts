import { Request, Response } from 'express';
import { mangaService } from './manga.service';
import ChapterService from './../chapter/chapter.service';
import { CACHE_MANGA_TIME, PAGE_SIZE_CHAPTER } from './../../common/app.constance';
import { cacheService } from './../../common/cache.helper';
export const detailMangaController = async (req: Request, res: Response) => {
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const keyCache = `cacheMangaDetail-${page}-${req.params.slug}`;
    let cacheData = cacheService.get(keyCache);
    if (cacheData) {
        return res.render('manga/detail', cacheData as object);
    }
    const manga = await mangaService.findBySlug(req.params.slug);
    if (!manga) {
        return res.redirect('/');
    }
    const [chapters, totalManga] = await Promise.all([
        ChapterService.getListChapterMangaByPage(manga._id.toString(), page, PAGE_SIZE_CHAPTER),
        ChapterService.countChapterOfManga(manga._id.toString()),
    ]);
    const dataRender = {
        manga: manga,
        chapters: chapters,
        totalManga: totalManga,
    };
    cacheService.set(keyCache, dataRender, CACHE_MANGA_TIME);
    return res.render('manga/detail', dataRender);
};
