import {Request, Response} from "express";
import AuthService from './auth.service';
import bcrypt from 'bcrypt';

export const renderLogin = (req: Request|any, res: Response) => {
    if (req.session.admin) {
        return res.redirect('/admin');
    }
    return res.render('admin/auth/login.ejs');
}

export const Register = async (req: Request, res: Response) => {
    const {name, password} = req.body;
    const newAdmin = await AuthService.Register(name, password);
    return res.json(newAdmin);
}

export const Login = async (req: Request|any, res: Response) => {
    const {name, password} = req.body;
    const adminByName = await AuthService.Login(name, password);
    bcrypt.compare(password, adminByName.password, function(err, result) {
        if (result === true) {
            req.session.admin = {name: adminByName.name};
            return res.redirect('/admin');
        } else {
            return res.redirect('/admin/login');
        }
    });
}

export const Authentication = async (req: Request| any, res: Response, next) => {
    if (req.session.admin) {
        //console.log(req.session.admin);
        next();
    } else {
        return res.redirect('/admin/login');
    }
}

