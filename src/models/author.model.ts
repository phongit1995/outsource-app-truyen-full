import mongoose, {Schema, model} from 'mongoose';
import {makeSlug} from "../common/text.helper";

export interface Author {
    name: string;
    status: number;
    slug: string;
}

let author = new Schema({
    name: String,
    status: {
        type: Number,
        default: 1
    },
    slug: String
}, {
    timestamps: true
});

author.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = makeSlug(this.name);
    }
    next();
});
export const AuthorModel = model<Author>('author', author);
