import {Request, Response} from "express";
import MangaService from "./manga.service";
import moment from 'moment';

export const renderManga = async (req: Request|any, res: Response) => {
    const dataRender: object = {
        nameAdmin: req.session.admin.name,
        listManga: await MangaService.getAllManga(),
        moment
    };

    res.render('admin/manga/listManga.ejs', dataRender);
}

export const deleteManga = async (req: Request|any, res:Response) => {
    const {idDelete} = req.body;
    await MangaService.deleteManga(idDelete);

    res.redirect('/admin/manga');
}
