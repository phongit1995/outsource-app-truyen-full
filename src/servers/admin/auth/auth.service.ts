import {AdminModel} from '../../../models/admin.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export  class AuthService {
    public static async Register(name, password) {
        const hashPassword = bcrypt.hashSync(password, 10);
        const newAdmin = new AdminModel({
            name, password: hashPassword
        });
        const saveAdmin = await newAdmin.save();

        return saveAdmin;
    }
    public static async Login(name, password) {
        AdminModel.findOne({name}, function(err, admin)  {
            if (err) return false;
            bcrypt.compare(password, admin.password, function(err, result) {
                if (err) return false;
                return result;
            });
        });
    }
}

export default AuthService;
