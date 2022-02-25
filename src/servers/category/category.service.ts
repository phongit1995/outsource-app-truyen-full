import { cacheService } from './../../common/cache.helper';
import { CategoryModel } from './../../models/category.model';
import { MangaModel } from './../../models/manga.model';

export class CategoryService {
    public static getMangaByCategoryName(category: string, page: number, pageSize: number) {
        return MangaModel.find({
            category: category,
        })
            .sort({ chapter_update: -1 })
            .populate({
                path: 'last_chapter',
                select: '-content',
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
    }
    public static getTotalMangaByCategoryName(category: string) {
        return MangaModel.countDocuments({
            category: category,
        });
    }
    public static getMangaHotByCategoryName(category: string, page: number, pageSize: number) {
        return MangaModel.find({
            category: category,
        })
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
    public static async getCategoryBySlug(slug: string) {
        return CategoryModel.findOne({ slug });
    }
}
export default CategoryService;
