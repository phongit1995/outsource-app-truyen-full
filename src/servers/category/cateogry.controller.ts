import { Request, Response } from 'express';
import { getCategoryByName, getTitleByCategory } from './category.enum';
import CategoryService from './category.service';
import { cacheService } from './../../common/cache.helper';
export const getMangaByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize: number = 13;
    const categoryName = getCategoryByName(category);
    const getTitle = getTitleByCategory(category);
    if (!categoryName) {
        return res.redirect('/');
    }
    const keyCache = `cacheMangaCategory-${page}-${req.params.category}`;
    let cacheData = cacheService.get(keyCache);
    if (cacheData) {
        return res.render('category', cacheData as object);
    }
    const [listManga, totalManga, hotManga] = await Promise.all([
        CategoryService.getMangaByCategoryName(categoryName, page, pageSize),
        CategoryService.getTotalMangaByCategoryName(categoryName),
        CategoryService.getMangaHotByCategoryName(categoryName, 1, 10),
    ]);
    const dataRender: object = {
        listManga,
        categoryName,
        category,
        getTitle,
        pages: Math.ceil(totalManga / pageSize),
        current: page,
        pageSize,
        hotManga,
    };
    cacheService.set(keyCache, dataRender, 60 * 30);
    res.render('category', dataRender);
};
