import {Request, Response} from "express";

export const renderManga = (req: Request|any, res: Response) => {
    const dataRender: object = {
        nameAdmin: req.session.admin.name
    };
    res.render('admin/manga/listManga.ejs', dataRender);
}
