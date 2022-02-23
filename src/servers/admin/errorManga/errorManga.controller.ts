import {Request, Response} from "express";

export const renderErrorManga = (req: Request|any, res: Response) => {
    const dataRender: object = {
        nameAdmin: req.session.admin.name
    };
    res.render('admin/errorManga/listError.ejs', dataRender);
}