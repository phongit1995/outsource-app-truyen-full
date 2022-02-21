import {Router} from 'express';
import {getMangaByAuthor} from "./author.controller";

const router = Router();
router.get('/tac-gia/:author', getMangaByAuthor);

export default router;