import { MangaModel } from '../../models/manga.model';


export class AuthorService {
    public static getMangaByAuthor(authorSlug) {
        return MangaModel.find({authorSlug});
    }
    public static getMangaFullByAuthor(authorSlug) {
        return MangaModel.find({authorSlug, manga_status: 1});
    }
}

export default AuthorService;

