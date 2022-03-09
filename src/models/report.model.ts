import mongoose, {Schema, model} from 'mongoose';
import {Manga} from "./manga.model";
import {Chapter} from "./chapter.model";


export interface Report {
    content: string;
    manga: string;
    chapter: string;
    idManga: string | Manga;
    idChapter: string | Chapter;
    status: number;
}


let report = new Schema({
    content: String,
    manga: String,
    chapter: String,
    idManga: {
        ref: 'manga',
        type: mongoose.Types.ObjectId
    },
    idChapter: {
        ref: 'chapter',
        type: mongoose.Types.ObjectId
    },
    status: {
        type: Number,
        default: 0
    },
}, {
    collection: 'reports',
    timestamps: true
});

report.pre('save', function (next) {
    next();
});
export const ReportModel = model<Report>('report', report);



