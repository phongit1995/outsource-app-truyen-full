import { Schema, model, connect } from 'mongoose';
export enum ESettingEnumType {
    scripts = 'scripts',
    info = 'info',
    ads = 'ads',
    watermark = 'watermark',
}
export interface Setting {
    _id: string;
    header: string;
    footer: string;
    type: number;
    adsHome1: string;
    adsHome2: string;
    adsHome3: string;
    adsDetailManga1: string;
    adsDetailManga2: string;
    adsCategory1: string;
    adsCategory2: string;
    adsChapter1: string;
    adsChapter2: string;
    adsChapter3: string;
    watermark: string;
}
let setting = new Schema(
    {
        header: {
            type: String,
            default: null,
        },
        footer: {
            type: String,
            default: null,
        },
        type: {
            type: String,
            enum: ESettingEnumType,
            unique: true,
        },
        logo: {
            type: String,
            default: null,
        },
        title: {
            type: String,
            default: null,
        },
        description: {
            type: String,
            default: null,
        },
        keyword: {
            type: String,
            default: null,
        },
        adsHome1: {
            type: String,
            default: null,
        },
        adsHome2: {
            type: String,
            default: null,
        },
        adsHome3: {
            type: String,
            default: null,
        },
        adsDetailManga1: {
            type: String,
            default: null,
        },
        adsDetailManga2: {
            type: String,
            default: null,
        },
        adsCategory1: {
            type: String,
            default: null,
        },
        adsCategory2: {
            type: String,
            default: null,
        },
        adsChapter1: {
            type: String,
            default: null,
        },
        adsChapter2: {
            type: String,
            default: null,
        },
        adsChapter3: {
            type: String,
            default: null,
        },
        watermark: {
            type: String,
            default: null,
        },
    },
    { timestamps: true },
);

export const SettingModel = model<Setting>('setting', setting);
