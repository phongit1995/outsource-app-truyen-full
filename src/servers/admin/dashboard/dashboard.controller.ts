import { Request, Response } from 'express';
import ChapterService from '../chapter/chapter.service';
import MangaService from '../manga/manga.service';

export const renderDashboard = async (req: Request | any, res: Response) => {
    const [totalManga, totalChapter] = await Promise.all([
        MangaService.countAllManga(),
        ChapterService.countAllChapter(),
    ]);
    const dataRender: object = {
        nameAdmin: req.session.admin.name,
        totalManga,
        totalChapter,
    };

    res.render('admin/dashboard.ejs', dataRender);
};
