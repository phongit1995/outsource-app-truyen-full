import express from 'express';
import {
    detailMangaController,
    getListMangaByTypeController,
    getListNewByCategory,
    searchManga,
} from './manga.controller';
import { validate } from 'express-validation';
import { validationGetListManga } from './manga.validation';
import { addCategoryListMiddleware } from './../../middleware/addCategoryList.middleware';
const router = express.Router();
router.get(
    '/api/list-hot-buy-category',
    addCategoryListMiddleware,
    validate(validationGetListManga),
    getListMangaByTypeController,
);
router.get(
    '/api/list-new-buy-category',
    addCategoryListMiddleware,
    validate(validationGetListManga),
    getListNewByCategory,
);
router.get('/:slug', addCategoryListMiddleware, detailMangaController);
router.post('/api/search-manga', searchManga);
export default router;
