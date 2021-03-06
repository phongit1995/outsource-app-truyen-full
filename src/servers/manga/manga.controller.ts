import { Request, Response } from 'express';
import { mangaService } from './manga.service';
import ChapterService from './../chapter/chapter.service';
import { CACHE_MANGA_TIME, PAGE_SIZE_CHAPTER } from './../../common/app.constance';
import { cacheService } from './../../common/cache.helper';
import { getCategoryById } from './../../constance/category.const';
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
    const [chapters, totalChapter, listSameAuthor, listHot] = await Promise.all([
        ChapterService.getListChapterMangaByPage(manga._id.toString(), page, PAGE_SIZE_CHAPTER),
        ChapterService.countChapterOfManga(manga._id.toString()),
        mangaService.getListSameAuthor(manga.authorSlug, manga._id.toString()),
        mangaService.getListHostCache(),
    ]);
    const dataRender = {
        manga: manga,
        chapters: chapters,
        totalManga: totalChapter,
        current: page,
        pages: Math.ceil(totalChapter / PAGE_SIZE_CHAPTER),
        pageSize: PAGE_SIZE_CHAPTER,
        listSameAuthor,
        listHot,
    };
    cacheService.set(keyCache, dataRender, CACHE_MANGA_TIME);
    return res.render('manga/detail', dataRender);
};
export const getListMangaByTypeController = async (req: Request, res: Response) => {
    const { category } = req.query;
    const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 10;
    if (category.toString() == 'all') {
        const result = await mangaService.getListHot(page, pageSize);
        return res.status(200).json(result);
    }
    const categoryName = getCategoryById(parseInt(category.toString()));
    if (!categoryName) {
        return res.status(404).json({ message: 'error' });
    }
    const result = await mangaService.getListMangaByCategory(categoryName, page, pageSize);
    return res.status(200).json(result);
};
export const getListNewByCategory = async (req: Request, res: Response) => {
    const { category } = req.query;
    const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 10;
    if (category.toString() == 'all') {
        const result = await mangaService.getListNewChapter(page, pageSize);
        return res.status(200).json(result);
    }
    const categoryName = getCategoryById(parseInt(category.toString()));
    if (!categoryName) {
        return res.status(404).json({ message: 'error' });
    }
    const result = await mangaService.getListNewChapterByCategory(categoryName, page, pageSize);
    return res.status(200).json(result);
};
export const searchManga = async (req: Request, res: Response) => {
    const { search } = req.body;
    try {
        console.log(search);
        const result = await mangaService.searchManga(search);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
};
