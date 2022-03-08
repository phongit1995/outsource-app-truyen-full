import { Schema, model, connect } from 'mongoose';
export enum ESettingEnumType {
    scripts = 'scripts',
    info = 'info',
}
export interface Setting {
    _id: string;
    header: string;
    footer: string;
    type: number;
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
    },
    { timestamps: true },
);

export const SettingModel = model<Setting>('setting', setting);
