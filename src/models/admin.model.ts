import mongoose, {Schema, model, connect} from 'mongoose'

export  interface Admin {
    name: String;
    password: String;
}

let admin = new Schema({
    name: String,
    password: String
}, {
    collection: 'admins',
    timestamps: true
})

admin.pre('save', function (next) {
    next();
});
export const AdminModel = model<Admin>('admin', admin);




