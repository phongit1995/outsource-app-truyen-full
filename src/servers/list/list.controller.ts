import { Request, Response } from 'express';
import { mangaService } from '../manga/manga.service';
import { ListService } from './list.service';

export const detailList = async (req: Request, res: Response) => {
    const { list } = req.params;
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize: number = 13;
    const listInfo = await ListService.getCategorySortList(list);
    console.log(listInfo);
    let condition: { category?: string[] } = {};
    let sort: { [index: string]: any } = {};
    if (!listInfo) {
        return res.redirect('/');
    }
    if (listInfo.category.length > 0) {
        condition.category = listInfo.category;
    }
    if (Object.keys(listInfo.sort).length > 0) {
        sort = listInfo.sort;
    }
    // console.log(condition);
    // console.log(sort);
    const listManga = await mangaService.getMangaByCondition(condition, sort, page, pageSize);
    console.log(listManga);
    res.render('list');
};

export const addNewList = async (req: Request, res: Response) => {
    try {
        const data = await ListService.addNewList(req.body);
        res.status(200).json(data);
    } catch (error) {}
};
