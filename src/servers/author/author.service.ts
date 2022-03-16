import { MangaModel } from '../../models/manga.model';


export class AuthorService {
    public static getMangaByAuthor(authorSlug) {
        return MangaModel
            .find({authorSlug})
            .sort({ chapter_update: -1 })
            .populate({
                path: 'last_chapter',
                select: '-content',
            });
    }
    public static getMangaFullByAuthor(authorSlug) {
        return MangaModel
            .find({authorSlug, manga_status: 1})
            .sort({ chapter_update: -1 })
            .populate({
                path: 'last_chapter',
                select: '-content',
            });
    }
}

export default AuthorService;

