import { Request, Response } from 'express';
import CategoryService from '../category/category.service';
import { ListService } from './list.service';
import moment from 'moment';
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
    console.log(req.body);
    const result = await ListService.addList(req.body);
    res.redirect('/admin/danh-muc');
};
