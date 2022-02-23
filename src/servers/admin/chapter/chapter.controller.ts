import {Request, Response} from "express";

export const renderChapter = (req: Request|any, res: Response) => {
    const dataRender: object = {
        nameAdmin: req.session.admin.name
    };
    res.render('admin/chapter/listChapter.ejs', dataRender);
}
