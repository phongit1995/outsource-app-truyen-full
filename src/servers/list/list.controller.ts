import { Request, Response } from 'express';
import { ListService } from './list.service';

export const detailList = async (req: Request, res: Response) => {};

export const addNewList = async (req: Request, res: Response) => {
    try {
        const data = await ListService.addNewList(req.body);
        res.status(200).json(data);
    } catch (error) {}
};
