import {Request, Response} from "express";

export const Authentication = async (req: Request| any, res: Response, next) => {
    if (req.session.admin) {
        //console.log(req.session.admin);
        next();
    } else {
        return res.redirect('/admin/login');
    }
}