import { Request, Response } from 'express';
export const indexController = (req: Request, res: Response) => {
    res.send('hello every body');
};
