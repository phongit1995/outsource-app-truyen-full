import {Request, Response} from "express";
import ChapterService from "./chapter.service";
import moment from "moment";

export const renderChapter = async (req: Request|any, res: Response) => {
    const perPage = 10;
    const page = req.params.page || 1;
    const countAllChapter = await ChapterService.getCountAllChapter();
    let listChapter = await ChapterService.getChapterByPage(page, perPage);
    const listChapterWithNameManga = await Promise.all(listChapter.map(async (chapter) => {
       const chapterObj = chapter.toObject();
       const mangaName =  await ChapterService.getNameMangaByChapter(chapterObj);

       return {...chapterObj, mangaName};
    }));
    const dataRender: object = {
        nameAdmin: req.session.admin.name,
        listChapterWithNameManga,
        current: page,
        pages: Math.ceil(countAllChapter / perPage),
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