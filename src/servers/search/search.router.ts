import { Router } from 'express';
import { addCategoryListMiddleware } from './../../middleware/addCategoryList.middleware';
import { getMangaByKey } from './search.controller';

const router = Router();

router.get('/tim-kiem', addCategoryListMiddleware, getMangaByKey);

export default router;
