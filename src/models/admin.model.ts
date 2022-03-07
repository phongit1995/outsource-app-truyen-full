import mongoose, { Schema, model, connect } from 'mongoose';

export interface Admin {
    name: string;
    password: string;
    role: number;
    status: boolean;
}

let admin = new Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        password: String,
        role: Number,
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        collection: 'admins',
        timestamps: true,
    },
);

admin.pre('save', function (next) {
    next();
});
export const AdminModel = model<Admin>('admin', admin);
