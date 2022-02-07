import mongoose, { Schema, model, connect } from 'mongoose';
import { Manga } from './manga.model';
export interface Chapter {
    manga: string | Manga;
    index: number;
    title: string;
    url: string;
    content: string;
}
let chapter = new Schema(
    {
        manga: {
            type: Schema.Types.ObjectId,
            ref: 'manga',
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
        images: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true },
);
export const MangaModel = model<Chapter>('chapter', chapter);
