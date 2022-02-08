import { ChapterModel } from './../../models/chapter.model';
class ChapterService {
    public static getListChapterMangaByPage = (
        mangaId: string,
        page: number,
        pageNumber: number,
    ) => {
        return ChapterModel.find({ manga: mangaId })
            .sort({ index: 1 })
            .skip((page - 1) * pageNumber)
            .limit(pageNumber)
            .select('-content -images');
    };
    public static countChapterOfManga = (mangaId: string) => {
        return ChapterModel.countDocuments({ manga: mangaId });
    };
}
export default ChapterService;
