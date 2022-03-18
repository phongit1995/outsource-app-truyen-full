import mongoose, { Schema, model, connect } from 'mongoose';
import { Manga } from './manga.model';
import { makeSlug } from './../common/text.helper';
export interface Chapter {
    manga: string | Manga;
    index: number;
    title: string;
    url: string;
    content: string;
    status: number;
    slug: string;
}
let chapter = new Schema(
    {
        manga: {
            type: Schema.Types.ObjectId,
            ref: 'manga',
            index: true,
        },
        index: {
            type: Number,
            default: 1,
        },
        title: {
            type: String,
        },
        url: {
            type: String,
        },
        content: {
            type: String,
        },
        status: {
            type: Number,
            default: 1,
        },
        slug: {
            type: String,
        },
    },
    { timestamps: true },
);
chapter.index({ manga: 1, index: 1 }, { unique: true });
chapter.index({ createdAt: -1 }, { unique: false });
chapter.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = makeSlug(this.title ? this.title : '');
    }
    next();
});
export const ChapterModel = model<Chapter>('chapter', chapter);
