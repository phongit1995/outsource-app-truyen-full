import { Request, Response } from 'express';
import { mangaService } from '../manga/manga.service';
export const indexController = async (req: Request, res: Response) => {
    const listMangaHot = await mangaService.getListHot(1, 13);
    const listNewUpdate = await mangaService.getListNewChapter(1, 21);

    res.render('home/index', {
        listMangaHot,
        listNewUpdate,
    });
};
