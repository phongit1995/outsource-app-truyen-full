import { Request, Response } from 'express';
import CategoryService from '../category/category.service';
import { ListService } from './list.service';
import moment from 'moment';
import { cacheService } from './../../../common/cache.helper';
const keyCache = 'KEY_CACHE_LIST_DATA';
export const listController = async (req: Request | any, res: Response) => {
    const list = await ListService.getAllList();
    res.render('admin/list/list', {
        list,
        moment,
    });
};
export const addListController = async (req: Request, res: Response) => {
    const category = await CategoryService.getAllCategory();
    res.render('admin/list/add', {
        category,
    });
};
export const addListHandleController = async (req: Request, res: Response) => {
    const result = await ListService.addList(req.body);
    cacheService.del(keyCache);
    res.redirect('/admin/danh-muc');
};
export const changeStatusListController = async (req: Request, res: Response) => {
    await ListService.changeStatus(req.params.id);
    cacheService.del(keyCache);
    res.status(200).json({ message: true });
};
export const deleteListController = async (req: Request, res: Response) => {
    await ListService.removeList(req.params.id);
    cacheService.del(keyCache);
    console.log(req.params.id);
    res.status(200).json({ message: true });
};
