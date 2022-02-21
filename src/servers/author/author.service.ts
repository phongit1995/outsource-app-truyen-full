import { MangaModel } from '../../models/manga.model';


export class AuthorService {
    public static getMangaByAuthor(authorSlug) {
        return MangaModel.find({authorSlug});
    }
}

export default AuthorService;

