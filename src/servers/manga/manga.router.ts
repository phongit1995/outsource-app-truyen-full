import express from 'express';
import { detailMangaController, getListMangaByTypeController ,getListNewByCategory } from './manga.controller';
import { validate } from 'express-validation';
import { validationGetListManga } from './manga.validation';

const router = express.Router();
router.get(
    '/api/list-hot-buy-category',
    validate(validationGetListManga),
    getListMangaByTypeController,
);
router.get(
    '/api/list-new-buy-category',
    validate(validationGetListManga),
    getListNewByCategory,
);
router.get('/:slug', detailMangaController);
export default router;
