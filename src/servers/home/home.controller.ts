import { Request, Response } from 'express';
export const indexController = (req: Request, res: Response) => {
    res.render('home/index');
};
