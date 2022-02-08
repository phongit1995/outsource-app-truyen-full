import { Request, Response } from 'express';
import { mangaService } from './manga.service';

export const detailMangaController = async (req: Request, res: Response) => {
    const manga = await mangaService.findBySlug(req.params.slug);
    console.log(manga);

    if (manga) {
        return res.render('manga/detail', { manga: manga });
    }
    return res.redirect('/');
};
