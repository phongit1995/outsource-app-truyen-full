import { Manga, MangaModel } from './../../models/manga.model';

class MangaService {
    public findBySlug(slug: string) {
        return MangaModel.findOne({ slug });
    }
    public getListHot(page: number, pageSize: number) {
        return MangaModel.find()
            .sort({ rate: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
    }
}
export const mangaService = new MangaService();
