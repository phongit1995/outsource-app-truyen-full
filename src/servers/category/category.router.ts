import { Router } from 'express';
import { getMangaByCategory } from './cateogry.controller';
const router = Router();
router.get('/the-loai/:category', getMangaByCategory);
export default router;
