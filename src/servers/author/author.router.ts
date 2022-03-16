import { Router } from 'express';
import { addCategoryListMiddleware } from './../../middleware/addCategoryList.middleware';
import { getMangaByAuthor, getMangaFullByAuthor } from './author.controller';

const router = Router();

router.get('/tac-gia/:author', addCategoryListMiddleware, getMangaByAuthor);
router.get('/tac-gia/:author/hoan', addCategoryListMiddleware, getMangaFullByAuthor);

export default router;
