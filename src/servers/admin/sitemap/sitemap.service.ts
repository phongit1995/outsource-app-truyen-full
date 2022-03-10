import { MangaModel } from './../../../models/manga.model';
import { ChapterModel } from './../../../models/chapter.model';
import { AuthorModel } from './../../../models/author.model';
export class SiteMapService {
    public static getListAllAuthor() {
        return AuthorModel.find();
    }
}
