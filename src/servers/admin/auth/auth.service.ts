import {AdminModel} from '../../../models/admin.model';
import bcrypt from 'bcrypt';

export  class AuthService {
    public static async Register(name: string, password: string) {
        const hashPassword = bcrypt.hashSync(password, 10);
        const newAdmin = new AdminModel({
            name, password: hashPassword
        });
        const admin = await newAdmin.save();

        return admin;
    }
    public static async Login(name: string, password: string) {
        const adminByName =  await AdminModel.findOne({name});
        return adminByName;
    }
}

export default AuthService;
