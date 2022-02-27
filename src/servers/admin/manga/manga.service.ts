import {MangaModel} from "../../../models/manga.model";

export class MangaService {
    public static getAllManga() {
        return MangaModel.find();
    }
    public static deleteManga(id) {
        return MangaModel.deleteOne({_id: id});
    }
}

export default MangaService;