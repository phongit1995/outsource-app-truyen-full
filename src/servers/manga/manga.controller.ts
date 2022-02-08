import { Request, Response } from 'express';
import { mangaService } from './manga.service';
import ChapterService from './../chapter/chapter.service';
import { PAGE_SIZE_CHAPTER } from './../../common/app.constance';
export const detailMangaController = async (req: Request, res: Response) => {
    const manga = await mangaService.findBySlug(req.params.slug);
    if (!manga) {
        return res.redirect('/');
    }
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const chapters = await ChapterService.getListChapterMangaByPage(
        manga._id.toString(),
        page,
        PAGE_SIZE_CHAPTER,
    );
    const totalManga = await ChapterService.countChapterOfManga(manga._id.toString());
    return res.render('manga/detail', {
        manga: manga,
        chapters: chapters,
        totalManga: totalManga,
    });
};
