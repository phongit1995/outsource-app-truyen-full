import express from 'express';
import { detailChapterController, getNextChapter } from './chapter.controller';
import {validate} from 'express-validation';
import { validationNextChapter } from './chapter.validation';
const router = express.Router();

router.get('/api/chapter/next-chapter/:chapter',validate(validationNextChapter),getNextChapter)
router.get('/:manga/:chapter', detailChapterController);

export default router;
