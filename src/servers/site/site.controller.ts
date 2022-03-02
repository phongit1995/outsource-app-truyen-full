import {Request, Response} from "express";
import {CategoryModel} from "../../models/category.model";

export const contact = async (req: Request|any, res: Response) => {
    const headerCategoryList = await CategoryModel.find().sort({createdAt: -1});
    res.render('site/contact.ejs', {headerCategoryList});
}

export const introduce = async (req: Request, res: Response) => {
    const headerCategoryList = await CategoryModel.find().sort({createdAt: -1});
    res.render('site/introduce.ejs', {headerCategoryList});
}
export const ToS = async (req: Request, res: Response) => {
    const headerCategoryList = await CategoryModel.find().sort({createdAt: -1});
    res.render('site/ToS.ejs', {headerCategoryList});
}