import { Joi } from 'express-validation';
export const validationNextChapter = {
    params: Joi.object({
        chapter:Joi.string()
    }),
};
