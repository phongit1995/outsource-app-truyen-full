import { NextFunction, Request, Response } from 'express';
import { ListService } from './../servers/list/list.service';
import CategoryService from './../servers/category/category.service';

export const addCategoryListMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const [categoryList, listCache] = await Promise.all([
        CategoryService.getListCategoryCache(),
        ListService.getCategoryCache(),
    ]);
    res.locals.headerCategoryList = categoryList;
    res.locals.headerList = listCache;
    next();
};
