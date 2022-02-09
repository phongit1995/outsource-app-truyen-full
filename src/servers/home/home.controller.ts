import { Request, Response } from 'express';
import { mangaService } from '../manga/manga.service';
import { cacheService } from './../../common/cache.helper';
export const indexController = async (req: Request, res: Response) => {
    const keyCache: string = 'INDEX_CACHE';
    const dataCache = cacheService.get(keyCache);
    if (dataCache) {
        return res.render('home/index', dataCache as object);
    }
    const [listMangaHot, listNewUpdate, listMangaDone] = await Promise.all([
        mangaService.getListHot(1, 13),
        mangaService.getListNewChapter(1, 21),
        mangaService.getListMangaDone(1, 12),
    ]);
    cacheService.set(
        keyCache,
        {
            listMangaHot,
            listNewUpdate,
            listMangaDone,
        },
        60 * 10,
    );
    res.render('home/index', {
        listMangaHot,
        listNewUpdate,
        listMangaDone,
    });
};
