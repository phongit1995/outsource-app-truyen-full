import { NextFunction, Request, Response } from 'express';
import { ListService } from './../servers/list/list.service';
import CategoryService from './../servers/category/category.service';
import { SettingService } from './../servers/admin/setting/setting.service';
export const addCategoryListMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const [categoryList, listCache, adsSetting] = await Promise.all([
        CategoryService.getListCategoryCache(),
        ListService.getCategoryCache(),
        SettingService.getSettingAds(),
    ]);
    res.locals.headerCategoryList = categoryList;
    res.locals.headerList = listCache ? listCache : [];
    res.locals.adsSetting = adsSetting;
    next();
};
