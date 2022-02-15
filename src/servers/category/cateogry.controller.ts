import { Request, Response } from 'express';
import { getCategoryByName } from './category.enum';

export const getMangaByCategory = (req: Request, res: Response) => {
    const { category } = req.params;
    console.log(category);
    const categoryName = getCategoryByName(category);
    if (!categoryName) {
        return res.redirect('/');
    }
    res.render('category');
};
