import { Request, Response } from 'express';
import { mangaService } from '../manga/manga.service';
import { ListService } from './list.service';
import { cacheService } from './../../common/cache.helper';
export const detailList = async (req: Request, res: Response) => {
    const { list } = req.params;
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize: number = 13;
    const keyCache = `cacheMangaList-${page}-${req.params.list}`;
    let cacheData = cacheService.get(keyCache);
    if (cacheData) {
        return res.render('list', cacheData as object);
    }
    const listInfo = await ListService.getListBySlug(list);
    if (!listInfo) {
        return res.redirect('/');
    }
    let condition: { list?: string } = {};
    let sort: { [index: string]: any } = {};
    const listNotFull = ['truyen-moi', 'truyen-hot', 'truyen-full'];
    if (listNotFull.includes(list)) {
        if (list == listNotFull[0]) {
            sort.chapter_update = -1;
        }
        if (list == listNotFull[1]) {
            sort.isHot = -1;
        }
        if (list == listNotFull[1]) {
            sort.manga_status = -1;
        }
    } else {
        condition.list = list;
    }
    const [listManga, totalManga, hotManga] = await Promise.all([
        mangaService.getMangaByCondition(condition, sort, page, pageSize),
        mangaService.countDocumentByCondition(condition),
        mangaService.getListHostCache(),
    ]);
    const dataRender: object = {
        listManga,
        description: listInfo.description,
        slug: list,
        current: page,
        pageSize: pageSize,
        pages: Math.ceil(totalManga / pageSize),
        getTitle: listInfo.description,
        listName: listInfo.name,
        list,
        hotManga,
        isFull: list == 'truyen-full',
    };
    cacheService.set(keyCache, dataRender, 60 * 30);
    res.render('list', dataRender);
};
export const detailListFull = async (req: Request, res: Response) => {
    const { list } = req.params;
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize: number = 13;
    const keyCache = `cacheMangaList-full-${page}-${req.params.list}`;
    let cacheData = cacheService.get(keyCache);
    if (cacheData) {
        return res.render('list', cacheData as object);
    }
    const listInfo = await ListService.getListBySlug(list);
    if (!listInfo) {
        return res.redirect('/');
    }
    let condition: { list?: string; manga_status: boolean } = {
        manga_status: true,
    };
    let sort: { [index: string]: any } = {};
    const listNotFull = ['truyen-moi', 'truyen-hot', 'truyen-full'];
    if (listNotFull.includes(list)) {
        if (list == listNotFull[0]) {
            sort.chapter_update = -1;
        }
        if (list == listNotFull[1]) {
            sort.isHot = -1;
        }
        if (list == listNotFull[1]) {
            sort.manga_status = -1;
        }
    } else {
        condition.list = list;
    }
    condition.list = list;
    console.log(condition);
    const [listManga, totalManga, hotManga] = await Promise.all([
        mangaService.getMangaByCondition(condition, sort, page, pageSize),
        mangaService.countDocumentByCondition(condition),
        mangaService.getListHostCache(),
    ]);
    const dataRender: object = {
        listManga,
        description: listInfo.description,
        slug: list,
        current: page,
        pageSize: pageSize,
        pages: Math.ceil(totalManga / pageSize),
        getTitle: listInfo.description,
        listName: listInfo.name,
        list,
        hotManga,
        isFull: list == 'truyen-full',
    };
    cacheService.set(keyCache, dataRender, 60 * 30);
    res.render('list/listFull', dataRender);
};

export const addNewList = async (req: Request, res: Response) => {
    try {
        const data = await ListService.addNewList(req.body);
        res.status(200).json(data);
    } catch (error) {}
};
