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
}
export default CategoryService;