import mongoose, { Schema, model, connect } from 'mongoose';
interface Manga {
    name: string;
    author: string;
    category: string[];
    image: string;
    views: number;
    description: string;
    url: string;
    manga_status: number;
    chapters: string[];
    chapter_update: Date;
    last_chapter: string;
    enable: boolean;
}
let manga = new Schema(
    {
        name: String,
        author: String,
        category: [{ type: String }],
        image: String,
        views: {
            type: Number,
            default: 1,
        },
        description: String,
        url: String,
        manga_status: {
            type: Number,
        },
        chapters: [{ type: mongoose.Types.ObjectId, ref: 'chapter' }],
        chapter_update: {
            type: Date,
            default: Date.now,
        },
        last_chapter: {
            type: mongoose.Types.ObjectId,
            ref: 'chapter',
        },
        enable: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);
export const MangaModel = model<Manga>('manga', manga);
