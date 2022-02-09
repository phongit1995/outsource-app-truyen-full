import express from 'express';
import { detailMangaController, getListMangaByTypeController } from './manga.controller';
import { validate } from 'express-validation';
import { validationGetListManga } from './manga.validation';

const router = express.Router();
router.get(
    '/api/list-manga-buy-category',
    validate(validationGetListManga),
    getListMangaByTypeController,
);
router.get('/:slug', detailMangaController);
export default router;
