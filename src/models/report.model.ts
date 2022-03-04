import mongoose, {Schema, model} from 'mongoose';


export interface Report {
    content: string;
    manga: string;
    chapter: string;
    status: number;
}


let report = new Schema({
    content: String,
    manga: String,
    chapter: String,
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



