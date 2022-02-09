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
    public getListNewChapter(page: number, pageSize: number) {
        return MangaModel.find()
            .sort({ chapter_update: -1 })
            .populate({
                path: 'last_chapter',
                select: '-content',
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
    }
    public getListMangaDone(page: number, pageSize: number) {}
}
export const mangaService = new MangaService();
