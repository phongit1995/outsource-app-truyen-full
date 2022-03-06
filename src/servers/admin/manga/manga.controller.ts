import {Request, Response} from "express";
import MangaService from "./manga.service";
import moment from 'moment';
import {MangaModel} from "../../../models/manga.model";

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

export const renderUpdateManga = async (req: Request|any, res: Response) => {
    const manga = await MangaModel.findOne({_id: req.query.idUpdate});

    res.render('admin/manga/updateManga.ejs', {
        manga
    });
}

export const updateManga = async (req: Request|any, res:Response) => {
    const {id, name, description, author} = req.body;
    await MangaService.updateManga(id, name, description, author);

    res.redirect('/admin/manga');
}
