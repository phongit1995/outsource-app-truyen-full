import {Request, Response} from "express";
import MangaService from "./manga.service";
import moment from 'moment';

export const renderManga = async (req: Request|any, res: Response) => {
    const perPage = 10;   // Amount manga one page
    const page = req.params.page || 1;
    const listManga =  await MangaService.getMangaByPage(page, perPage);
    const countAllManga = await MangaService.getCountAllManga();

    const dataRender: object = {
        nameAdmin: req.session.admin.name,
        listManga,
        current: page,
        pages: Math.ceil(countAllManga / perPage),
        moment
    };

    res.render('admin/manga/listManga.ejs', dataRender);
}

export const deleteManga = async (req: Request|any, res:Response) => {
    const {idDelete} = req.body;
    await MangaService.deleteManga(idDelete);

    res.redirect('/admin/manga');
}
