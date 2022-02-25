import {Request, Response} from "express";

export const renderType = (req: Request|any, res: Response) => {
    const dataRender: object = {
        nameAdmin: req.session.admin.name
    };
    res.render('admin/type/listType.ejs', dataRender);
}
