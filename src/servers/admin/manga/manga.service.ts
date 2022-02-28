import {MangaModel} from "../../../models/manga.model";

export class MangaService {
    public static getCountAllManga() {
        return MangaModel.find().count();
    }
    public static getMangaByPage(page, perPage) {
        return MangaModel.find().skip((perPage * page) - perPage).limit(perPage).sort({createdAt: -1});
    }
    public static deleteManga(id) {
        return MangaModel.deleteOne({_id: id});
    }
}

export default MangaService;