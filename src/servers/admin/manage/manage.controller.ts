import {Request, Response} from "express";

export const renderDashboard = (req: Request, res: Response) => {
    res.render('admin/dashboard.ejs');
}