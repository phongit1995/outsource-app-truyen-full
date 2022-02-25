import {Request, Response} from "express";
import CategoryService from './category.service';
import {makeSlug} from "../../../common/text.helper";
import moment from 'moment';

export const renderCategory = async (req: Request|any, res: Response) => {
    const listAllCategory = await CategoryService.getAllCategory();
    const dataRender: object = {
        nameAdmin: req.session.admin.name,
        moment,
        listAllCategory
    };

    return res.render('admin/category/listCategory.ejs', dataRender);
}
export const renderCreate = (req: Request|any, res: Response) => {
    const dataRender: object = {
        nameAdmin: req.session.admin.name,
    };

    return res.render('admin/category/createCategory.ejs', dataRender);
}

export const handleCreate = async (req: Request|any, res: Response) => {
    const {name, title} = req.body;
    const slug = makeSlug(name);

    await CategoryService.createCategory({name, title, slug});
    return res.redirect('/admin/category');
}

export const handleDelete = async (req: Request|any, res: Response) => {
    const {idDelete} = req.body;
    await CategoryService.deleteCategory(idDelete);

    return res.redirect('/admin/category');
}

export const changeStatus = async (req: Request| any, res: Response) => {
    const {idChangeStatus} = req.body;

    await CategoryService.changeStatus(idChangeStatus);
    return res.redirect('/admin/category');
}
