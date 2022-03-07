import { AdminModel } from './../../../models/admin.model';
import bcrypt from 'bcrypt';
export class UserService {
    public static getListUser() {
        return AdminModel.find().sort({ role: 1 });
    }
    public static createAdmin(user: string, password: string, role: number = 2) {
        const hashPassword = bcrypt.hashSync(password, 10);
        return AdminModel.create({
            name: user,
            password: hashPassword,
            role: role,
        });
    }
    public static findUserByName(name: string) {
        return AdminModel.findOne({ name: name });
    }
    public static deleteUser(id: string) {
        return AdminModel.remove({ _id: id });
    }
}
