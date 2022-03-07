import mongoose, { Schema, model, connect } from 'mongoose';

export interface Crawler {
    status: Boolean;
}

let crawler = new Schema(
    {
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        collection: 'crawler',
        timestamps: true,
    },
);

export const CrawlerModel = model<Crawler>('crawler', crawler);
