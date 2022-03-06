import {ChapterModel} from '../../../models/chapter.model';
import {MangaModel} from "../../../models/manga.model";

export class ChapterService {
    public static getCountAllChapter() {
        return ChapterModel.find().count();
    }
    public static getChapterById(id) {
        return ChapterModel.findOne({_id: id});
    }
    public static getChapterByPage(page, perPage) {
        return ChapterModel
            .find()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .sort({createdAt: -1})
            .allowDiskUse(true);
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
    public static async updateChapter(id, title) {
        const chapter = await ChapterModel.findOne({_id: id});

        chapter.title = title;
        return chapter.save();
    }
}

export default ChapterService;