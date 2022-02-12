import { ChapterModel } from './../../models/chapter.model';
import request from 'request-promise';
import {getUserAgent} from './../../common/text.helper';
import cheerio from 'cheerio';

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
    public static getChapterBySlug = async  (mangaId:string,slug:string)=>{
        return ChapterModel.findOne({manga:mangaId, slug});
    }
    public static getContentChapter = async (url:string)=>{
        if(!url){
            throw new Error('url not found');
        }
        const options = {
            uri:url,
            method:'GET',
            headers: {
                'User-Agent': getUserAgent(),
            },
        }
        const data = await request(options);
        const $ = cheerio.load(data);
        $('#chapter-c p').first().remove();
        $('#ads-chapter-pc-top').remove();
        let chapterContent = $('#chapter-c');
        return chapterContent.html() ;
    }
    public static getDetailChapterById(id:string){
        return ChapterModel.findById(id);
    }
    public static getChapterByMangaAndIndex(mangaId:string,index:number){
        return ChapterModel.findOne({
            manga:mangaId,
            index:index
        })
    }
    public static getListChapter(mangaId:string){
        return ChapterModel.find({
            manga:mangaId
        }).select('-content').sort({index:1})
    }
}
export default ChapterService;
