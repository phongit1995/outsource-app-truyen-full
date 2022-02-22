import {Request, Response} from "express";

export const renderDashboard = (req: Request|any, res: Response) => {
    const dataRender: object = {
        nameAdmin: req.session.admin.name
    };
    res.render('admin/dashboard.ejs', dataRender);
}