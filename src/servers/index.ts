import express from 'express';
import IndexService from './home/home.router';
import MangaService from './manga/manga.router';
const router = express.Router();
router.use('/', IndexService);
router.use('/', MangaService);
export default router;
