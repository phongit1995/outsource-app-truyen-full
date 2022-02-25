import mongoose, { Schema, model } from 'mongoose';
import { makeSlug } from '../common/text.helper';
export interface Category {
    name: string;
    title: string;
    status: number;
    slug: string;
}
let category = new Schema(
    {
        name: String,
        title: String,
        status: {
            type: Number,
            default: 1
        },  //1: hien thi, 0: an
        slug: {
            type: String,
            index: true,
        },
    },
    {
        collection: 'categories',
        timestamps: true
    },
);
category.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = makeSlug(this.name);
    }
    next();
});
export const CategoryModel = model<Category>('category', category);
