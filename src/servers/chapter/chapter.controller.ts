import { Request, Response } from "express";
import { mangaService } from "../manga/manga.service";
import ChapterService from "./chapter.service";

export const detailChapterController =async (req:Request,res:Response)=>{
    const {manga,chapter} = req.params ;
    const mangaDetail = await mangaService.findBySlug(manga);
    if(!mangaDetail){
        return res.redirect('/');
    }
    const chapterDetail = await ChapterService.getChapterBySlug(mangaDetail._id.toString(),chapter);
    if(!chapterDetail){
        return res.redirect('/');
    }
    if(!chapterDetail.content){
        let content = await ChapterService.getContentChapter(chapterDetail.url);
        chapterDetail.content = content ;
        chapterDetail.save();
    }
    return res.render('chapter/index',{
        manga:mangaDetail,
        chapter:chapterDetail
    });
}