import { Request, Response } from 'express';
import { UserService } from './user.service';

export const listUserController = async (req: Request, res: Response) => {
    const listUser = await UserService.getListUser();
    return res.render('admin/user', { listUser });
};
export const createAdminController = (req: Request, res: Response) => {
    return res.render('admin/user/create');
};
export const createAdminControllerPost = async (req: Request, res: Response) => {
    const { username, password, type } = req.body;
    const user = await UserService.findUserByName(username);
    if (user) {
        return res.status(400).json({ message: 'user name đã tồn tại' });
    }
    const admin = await UserService.createAdmin(username, password, type);
    return res.status(200).json(admin);
};
export const deleteAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('id delete');
    try {
        const result = await UserService.deleteUser(id);
        return res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
};
export const updateStatusAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await UserService.updateStatusUser(id);
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        res.status(400).json(error);
    }
};
