import { Request, Response } from 'express';

export const detailMangaController = (req: Request, res: Response) => {
    res.render('manga/detail');
};
