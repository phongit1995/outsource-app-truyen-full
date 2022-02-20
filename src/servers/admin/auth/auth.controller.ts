import {Request, Response} from "express";
import AuthService from './auth.service';

export const renderLogin = (req: Request|any, res: Response) => {
    console.log(req.session.admin);
    req.session.admin = {
        website: 'anonystick.com',
        type: 'blog javascript',
        like: '4550'
    };
    res.render('admin/auth/login.ejs');
}

export const Register = async (req: Request, res: Response) => {
    const {name, password} = req.body;
    const newAdmin = await AuthService.Register(name, password);
    return res.json(newAdmin);
}

export const Login = async (req: Request, res: Response) => {
    const {name, password} = req.body;

}

export const Authentication = async (req: Request, res: Response) => {

}

