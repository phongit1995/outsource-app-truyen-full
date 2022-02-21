import {Request, Response} from "express";
import AuthorService from "./author.service";
import { mangaService } from '../manga/manga.service';
import { cacheService } from '../../common/cache.helper';

export const getMangaByAuthor = async (req: Request|any, res: Response) => {
    const slugAuthor = req.params.author;
    const [listMangaByAuthor, hotManga] = await Promise.all([
        AuthorService.getMangaByAuthor(slugAuthor),
        mangaService.getListHot(1, 7)
    ]);

    //Check cache
    const keyCache = `cacheMangaByAuthor-${slugAuthor}`;
    let cacheData = cacheService.get(keyCache);
    if (cacheData) {
        return res.render('author/index.ejs', cacheData as object);
    }

    if (listMangaByAuthor.length > 0) {
        const nameAuthor = listMangaByAuthor[0].author;
        const dataRender : object = {
            nameAuthor,
            slugAuthor,
            listMangaByAuthor,
            hotManga
        };

        cacheService.set(keyCache, dataRender, 60 * 30);
        return res.render('author/index.ejs', dataRender);
    }else {
        return res.redirect('/');
    }
}