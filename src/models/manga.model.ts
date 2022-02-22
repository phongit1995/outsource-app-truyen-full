import mongoose, { Schema, model, connect } from 'mongoose';
import { makeSlug } from './../common/text.helper';
import { Chapter } from './chapter.model';
export interface Manga {
    name: string;
    author: string;
    authorSlug: string;
    category: string[];
    image: string;
    imageOriginal: string;
    views: number;
    description: string;
    url: string;
    isHot: boolean;
    manga_status: number;
    rate: number;
    rateCount: number;
    chapters: string[];
    chapter_update: Date;
    last_chapter: string | Chapter;
    first_chapter: string | Chapter;
    enable: boolean;
    slug: string;
    totalChapter: string;
    crawled: boolean;
}
let manga = new Schema(
    {
        name: String,
        author: String,
        image: String,
        imageOriginal: String,
        views: {
            type: Number,
            default: 1,
        },
        description: String,
        url: String,
        category: [
            {
                type: String,
            },
        ],
        authorSlug: {
            type: String,
        },
        manga_status: {
            type: Number,
        },
        chapters: [{ type: mongoose.Types.ObjectId, ref: 'chapter' }],
        chapter_update: {
            type: Date,
            default: null,
        },
        isHot: {
            type: Boolean,
            default: false,
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
            default: 0,
        },
        rateCount: {
            type: Number,
            default: 0,
        },
        slug: {
            type: String,
            index: true,
        },
        totalChapter: {
            type: Number,
        },
        crawled: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);
manga.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = makeSlug(this.name);
    }
    next();
});
export const MangaModel = model<Manga>('manga', manga);
