import express from 'express';
import IndexService from './home/home.router';
import MangaService from './manga/manga.router';
import ChapterService from './chapter/chapter.router';
import CategoryService from './category/category.router';
import ListService from './list/list.router';

import Auth from './admin/auth/auth.router';

const router = express.Router();
router.use('/', CategoryService);
router.use('/', ListService);
router.use('/', IndexService);
router.use('/', MangaService);
router.use('/', ChapterService);

//admin
router.use('/admin', Auth);

export default router;
