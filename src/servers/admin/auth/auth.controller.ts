import {Request, Response} from "express";
import AuthService from './auth.service'

export const Register = async (req: Request, res: Response) => {
    const {name, password} = req.body;
    const newAdmin = await AuthService.Register(name, password);
    res.json(newAdmin);
}

export const Login = async (req: Request, res: Response) => {
    const {name, password} = req.body;
    const adminByName = await AuthService.Login(name, password);
    res.json(adminByName);
}