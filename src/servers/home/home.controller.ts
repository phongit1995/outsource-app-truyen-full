import { Request, Response } from 'express';
import { mangaService } from '../manga/manga.service';
export const indexController = async (req: Request, res: Response) => {
    const [listMangaHot, listNewUpdate, listMangaDone] = await Promise.all([
        mangaService.getListHot(1, 13),
        mangaService.getListNewChapter(1, 21),
        mangaService.getListMangaDone(1, 12),
    ]);
    res.render('home/index', {
        listMangaHot,
        listNewUpdate,
        listMangaDone,
    });
};
