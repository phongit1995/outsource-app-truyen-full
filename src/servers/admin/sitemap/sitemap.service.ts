import { MangaModel } from './../../../models/manga.model';
import { ChapterModel } from './../../../models/chapter.model';
import { AuthorModel } from './../../../models/author.model';
import { ListModel } from './../../../models/list.model';
import { CategoryModel } from './../../../models/category.model';
export class SiteMapService {
    public static getListAllAuthor() {
        return AuthorModel.find();
    }
    public static getList() {
        return ListModel.find();
    }
    public static getListCategory() {
        return CategoryModel.find();
    }
    public static getListManga() {
        return MangaModel.find({ crawled: true });
    }
    public static getListChapter() {
        return ChapterModel.find()
            .populate({
                path: 'manga',
                select: 'slug',
            })
            .select('slug manga')
            .cursor();
    }
    public static getMangaByCategory(category: string) {
        return MangaModel.find({
            crawled: true,
            category: category,
        }).select('slug');
    }
}
