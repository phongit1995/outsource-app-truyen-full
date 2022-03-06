import {MangaModel} from "../../../models/manga.model";

export class MangaService {
    public static getCountAllManga() {
        return MangaModel.find().count();
    }
    public static getMangaByPage(page, perPage) {
        return MangaModel
            .find()
            .sort({ chapter_update: -1 })
            .populate({
                path: 'last_chapter',
                select: '-content',
            })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .allowDiskUse(true);
    }
    public static deleteManga(id) {
        return MangaModel.deleteOne({_id: id});
    }
    public static async updateManga(id, name, description, author) {
        const mangaUpdate = await MangaModel.findOne({_id: id});

        mangaUpdate.name = name;
        mangaUpdate.description = description;
        mangaUpdate.author = author;
        return mangaUpdate.save();
    }
}

export default MangaService;