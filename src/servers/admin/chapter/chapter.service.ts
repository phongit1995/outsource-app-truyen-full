import {ChapterModel} from '../../../models/chapter.model';
import {MangaModel} from "../../../models/manga.model";

export class ChapterService {
    public static getAllChapter() {
        return ChapterModel.find().sort({createdAt: -1});
    }
    public static async changeStatus(id) {
        const chapter = await ChapterModel.findOne({_id: id});
        if (chapter.status === null || chapter.status === 1) {
            chapter.status = 0;
        }else {
            chapter.status = 1;
        }

        return chapter.save();
    }
    public static deleteChapter(id) {
        return ChapterModel.deleteOne({_id: id});
    }
    public static async getNameMangaByChapter(chapter) {
        const manga = await MangaModel.findOne({_id: chapter.manga});

        return manga.name;
    }
}

export default ChapterService;