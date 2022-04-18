import { MangaModel } from '../../models/manga.model';
import { cacheService } from '../../common/cache.helper';
import { CategoryModel } from '../../models/category.model';

export class SearchService {
    public static getMangaByKey(key: string, page: number, pageSize) {
        return MangaModel.find({ slug: { $regex: key, $options: 'i' } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
    }
    public static getToTalMangaByKey(key: string) {
        return MangaModel.find({ slug: { $regex: key, $options: 'i' } }).count();
    }
    public static getMangaHot(page: number, pageSize: number) {
        return MangaModel.find()
            .sort({
                isHot: -1,
                chapter_update: -1,
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
    }
    public static async getListCategoryCache() {
        const cacheCategory = 'CACHE_CATEGORY';
        const dataCache = cacheService.get(cacheCategory);
        if (dataCache) {
            return dataCache;
        }
        const listCategory = await CategoryModel.find().sort({ createdAt: 1 });
        cacheService.set(cacheCategory, listCategory, 60 * 60 * 12);
        return listCategory;
    }
}

export default SearchService;
