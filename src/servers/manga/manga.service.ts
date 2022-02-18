import { cacheService } from './../../common/cache.helper';
import { Manga, MangaModel } from './../../models/manga.model';

class MangaService {
    public findBySlug(slug: string) {
        return MangaModel.findOne({ slug })
            .populate({
                path: 'first_chapter',
                select: '-content',
            })
            .populate({
                path: 'last_chapter',
                select: '-content',
            });
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
    public getListMangaByCategory(category: string, page: number, pageSize: number) {
        return MangaModel.find({
            category,
        })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
    }
    public getListNewChapterByCategory(category: string, page: number, pageSize: number) {
        return MangaModel.find({ category })
            .sort({ chapter_update: -1 })
            .populate({
                path: 'last_chapter',
                select: '-content',
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
    }
    public getMangaById(id: string) {
        return MangaModel.findById(id);
    }
    public getListSameAuthor(author: string, mangaId: string) {
        return MangaModel.find({
            authorSlug: author,
            _id: { $ne: mangaId },
        }).limit(5);
    }
    public async getListHostCache() {
        const keyCache = 'LIST_MANGA_HOST';
        let dataCache = cacheService.get(keyCache);
        if (dataCache) {
            return dataCache;
        }
        const result = await MangaModel.find().sort({ rate: -1 }).limit(10);
        cacheService.set(keyCache, result, 60 * 60 * 2);
        return result;
    }
    public async getMangaByCondition(
        condition: object = {},
        sort: object = {},
        page: number,
        pageSize: number,
    ) {
        return MangaModel.find(condition)
            .sort(sort)
            .skip((page - 1) * pageSize)
            .limit(pageSize);
    }
}
export const mangaService = new MangaService();
