import {Request, Response} from "express";
import AuthorService from "./author.service";
import {AuthorModel} from "../../../models/author.model";

export const renderAuthor = async (req: Request|any, res: Response) => {
    const perPage = 10;   //10 author 1 page
    const page = req.params.page || 1;
    const amountAuthor = await AuthorService.getTotalAuthor();
    const listAuthorOnePage = await AuthorService.getAuthorByPage(page, perPage);
    const dataRender: object = {
        listAuthorOnePage,
        current: page,
        pages: Math.ceil(amountAuthor/ perPage)
    };

    res.render('admin/author/listAuthor.ejs', dataRender);
}

export const renderCreate = (req: Request, res: Response) => {
    res.render('admin/author/createAuthor.ejs');
}

export const createAuthor = async (req: Request|any, res: Response) => {
    const {name, status} = req.body;
    const newAuthor = new AuthorModel({name, status});

    await newAuthor.save();
    res.redirect('/admin/author');
}

export const deleteAuthor = async (req: Request|any, res: Response) => {
    await AuthorService.deleteAuthor(req.body.idDelete);
    res.redirect('/admin/author');
}

export const changeStatus = async (req: Request|any, res: Response) => {
    await AuthorService.changeStatus(req.body.idChangeStatus);
    res.redirect('/admin/author');
}