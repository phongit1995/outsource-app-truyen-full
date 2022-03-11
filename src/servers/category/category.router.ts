import { Router } from 'express';
import { getMangaByCategory, getMangaFullByCategory } from './cateogry.controller';
import { addCategoryListMiddleware } from './../../middleware/addCategoryList.middleware';
const router = Router();

router.get('/the-loai/:category', addCategoryListMiddleware, getMangaByCategory);
router.get('/the-loai/:category/hoan', addCategoryListMiddleware, getMangaFullByCategory);

export default router;
