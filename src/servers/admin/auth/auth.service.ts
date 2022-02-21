import {AdminModel} from '../../../models/admin.model';
import bcrypt from 'bcrypt';

export  class AuthService {
    public static async Register(name, password) {
        const hashPassword = bcrypt.hashSync(password, 10);
        const newAdmin = new AdminModel({
            name, password: hashPassword
        });
        const admin = await newAdmin.save();

        return admin;
    }
    public static async Login(name, password) {
        const adminByName =  await AdminModel.findOne({name});
        return adminByName;
    }
}

export default AuthService;
