import express from 'express';
import IndexService from './home/home.router';
import MangaService from './manga/manga.router';
import ChapterService from './chapter/chapter.router';
const router = express.Router();
router.use('/', IndexService);
router.use('/', MangaService);
router.use('/',ChapterService);
export default router;
