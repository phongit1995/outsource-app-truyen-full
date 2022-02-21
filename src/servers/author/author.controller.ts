import {Request, Response} from "express";
import AuthorService from "./author.service";
import { mangaService } from '../manga/manga.service';

export const getMangaByAuthor = async (req: Request|any, res: Response) => {
    const slugAuthor = req.params.author;
    const listMangaByAuthor = await AuthorService.getMangaByAuthor(slugAuthor);
    const hotManga = await mangaService.getListHot(1, 7);

    if (listMangaByAuthor.length > 0) {
        const nameAuthor = listMangaByAuthor[0].author;
        const dataRender : object = {
            nameAuthor,
            slugAuthor,
            listMangaByAuthor,
            hotManga
        };
        return res.render('author/index.ejs', dataRender);
    }else {
        return res.redirect('/');
    }
}