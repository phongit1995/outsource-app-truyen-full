import {ReportModel} from '../../../models/report.model';


export class ReportService {
    public static getTotalReport() {
        return ReportModel.find().count();
    }
    public static getAuthorByPage(page, perPage) {
        return ReportModel.find().skip((perPage * page) - perPage).limit(perPage).sort({createdAt: -1});
    }
    public static createReport(content, manga, chapter) {
        const newReport = new ReportModel({
            content, manga, chapter
        });

        return newReport.save();
    }
    public static async changeStatus(id) {
        const report = await ReportModel.findOne({_id: id});

        if (report.status === 1) {
            report.status = 0;
        }else{
            report.status = 1;
        }
        return report.save();
    }
}