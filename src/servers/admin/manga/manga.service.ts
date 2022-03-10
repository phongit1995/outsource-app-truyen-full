import { MangaModel } from '../../../models/manga.model';

export class MangaService {
    public static getCountAllManga() {
        return MangaModel.find().count();
    }
    public static getCountAllMangaByKey(key: string) {
        return MangaModel.find({name: {$regex: key, $options: 'i'}}).count();
    }
    public static getMangaByPage(page: number, perPage: number) {
        return MangaModel.find()
            .sort({ chapter_update: -1 })
            .populate({
                path: 'last_chapter',
                select: '-content',
            })
            .skip(perPage * page - perPage)
            .limit(perPage)
            .allowDiskUse(true);
    }
    public static getMangaByPageAndKey(key: string, page: number, perPage: number) {
        return MangaModel.find({name: {$regex: key, $options: 'i'}})
            .sort({ chapter_update: -1 })
            .populate({
                path: 'last_chapter',
                select: '-content',
            })
            .skip(perPage * page - perPage)
            .limit(perPage)
            .allowDiskUse(true);
    }
    public static deleteManga(id: string) {
        return MangaModel.deleteOne({ _id: id });
    }
    public static async updateManga(id: string, name: string, description: string, author: string) {
        const mangaUpdate = await MangaModel.findOne({ _id: id });

        mangaUpdate.name = name;
        mangaUpdate.description = description;
        mangaUpdate.author = author;
        return mangaUpdate.save();
    }
    public static countAllManga() {
        return MangaModel.countDocuments({});
    }
}

export default MangaService;
