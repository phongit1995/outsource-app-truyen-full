import { NextFunction, Request, Response } from 'express';
import CategoryService from './../servers/category/category.service';

export const addCategoryListMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const categoryList = await CategoryService.getListCategoryCache();
    res.locals.headerCategoryList = categoryList;
    next();
};
