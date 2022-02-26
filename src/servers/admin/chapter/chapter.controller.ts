import {Request, Response} from "express";
import ChapterService from "./chapter.service";
import moment from "moment";

export const renderChapter = async (req: Request|any, res: Response) => {
    let listChapter = await ChapterService.getAllChapter();
    const listChapterWithNameManga = listChapter.map((chapter) => {
        const mangaName = ChapterService.getNameMangaByChapter(chapter);

        return {...chapter, mangaName};
    })
    const dataRender: object = {
        nameAdmin: req.session.admin.name,
        listChapterWithNameManga,
        moment
    };

    res.render('admin/chapter/listChapter.ejs', dataRender);
};

export const changeStatus = async (req: Request|any, res: Response) => {
    const {idChangeStatus} = req.body;

    await ChapterService.changeStatus(idChangeStatus);
    res.redirect('/admin/chapter');
};

export const deleteChapter = async (req: Request| any, res: Response) => {
    const {idDelete} = req.body;

    await ChapterService.deleteChapter(idDelete);
    res.redirect('/admin/chapter');
}