import { Request, Response } from 'express';
import { getCategoryByName, getTitleByCategory } from './category.enum';
import CategoryService from './category.service';

export const getMangaByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize:number = 13;
    const categoryName = getCategoryByName(category);
    const getTitle = getTitleByCategory(category)
    if (!categoryName) {
        return res.redirect('/');
    }
    const [listManga,totalManga]= await Promise.all([
        CategoryService.getMangaByCategoryName(categoryName, page, pageSize),
        CategoryService.getTotalMangaByCategoryName(categoryName)
    ])
    res.render('category', {
        listManga,
        categoryName,
        category,
        getTitle,
        pages:Math.ceil(totalManga / pageSize),
        current:page,
        pageSize
    });
};
