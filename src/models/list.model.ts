import mongoose, { Schema, model } from 'mongoose';
import { makeSlug } from '../common/text.helper';
export interface List {
    name: string;
    description: string;
    category: string[];
    slug: string;
    filter: number;
    status: boolean;
}
let list = new Schema(
    {
        name: String,
        description: String,
        category: [
            {
                type: String,
            },
        ],
        slug: {
            type: String,
            index: true,
        },
        filter: {
            type: Number,
            default: 2,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);
list.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = makeSlug(this.name);
    }
    next();
});
export const ListModel = model<List>('list', list);
