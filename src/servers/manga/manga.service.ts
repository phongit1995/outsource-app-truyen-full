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
    public getListMangaDone(page: number, pageSize: number) {
        return MangaModel.find({
            manga_status: 1,
        })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
    }
    public getListMangaByCategory(category:string,page: number, pageSize: number){
        return MangaModel.find({
            category
        }).skip((page - 1) * pageSize).limit(pageSize);
    }
}
export const mangaService = new MangaService();
