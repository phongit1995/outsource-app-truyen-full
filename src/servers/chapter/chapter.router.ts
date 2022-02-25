import express from 'express';
import { detailChapterController, getListChapter, getNextChapter } from './chapter.controller';
import { validate } from 'express-validation';
import { validationNextChapter } from './chapter.validation';
import { addCategoryListMiddleware } from './../../middleware/addCategoryList.middleware';
const router = express.Router();

router.get(
    '/api/chapter/next-chapter/:chapter',
    addCategoryListMiddleware,
    validate(validationNextChapter),
    getNextChapter,
);
router.get('/:manga/:chapter', addCategoryListMiddleware, detailChapterController);
router.get('/api/chapter/list-chapter/:manga', addCategoryListMiddleware, getListChapter);

export default router;
