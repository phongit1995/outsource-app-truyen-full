import {Request, Response} from "express";

export const renderCategory = (req: Request|any, res: Response) => {
    const dataRender: object = {
        nameAdmin: req.session.admin.name
    };
    res.render('admin/category/listCategory.ejs', dataRender);
}