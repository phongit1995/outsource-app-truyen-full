import { Request, Response } from 'express';
import { getCategoryByName } from './category.enum';
import CategoryService from './category.service';

export const getMangaByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const categoryName = getCategoryByName(category);
    if (!categoryName) {
        return res.redirect('/');
    }
    const listManga = await CategoryService.getMangaByCategoryName(categoryName, page, 13);
    res.render('category', {
        listManga,
        categoryName,
        category,
    });
};
