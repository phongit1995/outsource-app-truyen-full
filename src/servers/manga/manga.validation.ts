import { Joi } from 'express-validation';
export const validationGetListManga = {
    query: Joi.object({
        category: Joi.number().min(1),
        page: Joi.number().optional().default(1),
        pageSize: Joi.number().optional().default(10),
    }),
};
