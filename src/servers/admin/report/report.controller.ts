import {Request, Response} from "express";
import {ReportService} from "./report.service";
import {ReportModel} from "../../../models/report.model";

export const getReportOnePage = async (req: Request|any, res: Response) => {
    const page = req.params.page || 1;
    const perPage = 10;
    const amountReport = await ReportService.getTotalReport();
    const listReportOnePage = await ReportService.getReportByPage(page, perPage);
    const dataRender = {
        nameAdmin: req.session.admin.name,
        listReportOnePage,
        current: page,
        pages: Math.ceil(amountReport/ perPage)
    };

    res.render('admin/report/listReport.ejs', dataRender);
}

export const createReport = async (req: Request|any, res: Response) => {
    const {content, manga, chapter, idManga, idChapter} = req.body;

    await ReportService.createReport(content, manga, chapter, idManga, idChapter);
    res.redirect('back');
}

export const changeStatus = async (req: Request|any, res: Response) => {
    const {idChangeStatus} = req.body;

    await ReportService.changeStatus(idChangeStatus);
    res.redirect('back');
}