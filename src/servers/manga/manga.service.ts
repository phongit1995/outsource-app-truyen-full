import { Manga, MangaModel } from './../../models/manga.model';

class MangaService {
    public findBySlug(slug: string) {
        return MangaModel.findOne({ slug });
    }
}
export const mangaService = new MangaService();
