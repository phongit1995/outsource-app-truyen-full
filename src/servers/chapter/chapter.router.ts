import express from 'express';
import { detailChapterController } from './chapter.controller';
const router = express.Router();

router.get('/:manga/:chapter',detailChapterController);
export default router;
