import { Router } from 'express';
import { getMangaByCategory } from './cateogry.controller';
import { addCategoryListMiddleware } from './../../middleware/addCategoryList.middleware';
const router = Router();
router.get('/the-loai/:category', addCategoryListMiddleware, getMangaByCategory);
export default router;
