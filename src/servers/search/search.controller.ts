import {Request, Response} from "express";
import SearchService from "./search.service";

export const getMangaByKey = async (req: Request|any, res: Response) => {
    const key = req.query.tukhoa;
    const page = req.query.page || 1;
    const pageSize = 13;
    const [listMangaSearchByKey, totalMangaSearched, listCategory, hotManga] = await Promise.all([
        SearchService.getMangaByKey(key, page, pageSize),
        SearchService.getToTalMangaByKey(key),
        SearchService.getListCategoryCache(),
        SearchService.getMangaHot(1, 10)
    ]);

    return res.render('search', {
        key,
        totalMangaSearched,
        listMangaSearchByKey,
        pages: Math.ceil(totalMangaSearched / pageSize),
        current: page,
        pageSize,
        listCategory,
        headerCategoryList: listCategory,
        hotManga
    });
}