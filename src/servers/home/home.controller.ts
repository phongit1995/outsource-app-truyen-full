import { Request, Response } from 'express';
import { mangaService } from '../manga/manga.service';
export const indexController = async (req: Request, res: Response) => {
    const listMangaHot = await mangaService.getListHot(1, 13);
    console.log(listMangaHot);
    res.render('home/index', {
        listMangaHot,
    });
};
