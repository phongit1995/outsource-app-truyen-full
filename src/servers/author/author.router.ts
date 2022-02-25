import { Router } from 'express';
import { addCategoryListMiddleware } from './../../middleware/addCategoryList.middleware';
import { getMangaByAuthor } from './author.controller';

const router = Router();
router.get('/tac-gia/:author', addCategoryListMiddleware, getMangaByAuthor);

export default router;
