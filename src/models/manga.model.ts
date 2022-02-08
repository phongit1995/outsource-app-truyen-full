import mongoose, { Schema, model, connect } from 'mongoose';
import { makeSlug } from './../common/text.helper';
import { Chapter } from './chapter.model';
export interface Manga {
    name: string;
    author: string;
    authorSlug: string;
    category: string[];
    image: string;
    views: number;
    description: string;
    url: string;
    manga_status: number;
    rate: number;
    rateCount: number;
    chapters: string[];
    chapter_update: Date;
    last_chapter: string | Chapter;
    first_chapter: string | Chapter;
    enable: boolean;
    slug: string;
}
let manga = new Schema(
    {
        name: String,
        author: String,
        image: String,
        views: {
            type: Number,
            default: 1,
        },
        description: String,
        url: String,
        authorSlug: {
            type: String,
        },
        manga_status: {
            type: Number,
        },
        chapters: [{ type: mongoose.Types.ObjectId, ref: 'chapter' }],
        chapter_update: {
            type: Date,
            default: Date.now,
        },
        first_chapter: {
            type: mongoose.Types.ObjectId,
            ref: 'chapter',
        },
        last_chapter: {
            type: mongoose.Types.ObjectId,
            ref: 'chapter',
        },
        enable: {
            type: Boolean,
            default: true,
        },
        rate: {
            type: Number,
            default: 10,
        },
        rateCount: {
            type: Number,
            default: 1,
        },
        slug: {
            type: String,
            index: true,
        },
    },
    { timestamps: true },
);
manga.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = makeSlug(this.name);
    }
    console.log('run now');
    next();
});
export const MangaModel = model<Manga>('manga', manga);
