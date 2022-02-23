import express from 'express';
import IndexService from './home/home.router';
import MangaService from './manga/manga.router';
import ChapterService from './chapter/chapter.router';
import CategoryService from './category/category.router';
import ListService from './list/list.router';
import AuthorService from './author/author.router';
import Auth from './admin/auth/auth.router';
import Dashboard from './admin/dashboard/dashboard.router';
import MangaAdmin from './admin/manga/manga.router';
import ChapterAdmin from './admin/chapter/chapter.router';
import CategoryAdmin from './admin/category/category.router';
import TypeMangaAdmin from './admin/type/type.router';
import ErrorMangaAdmin from './admin/errorManga/errorManga.router';
const router = express.Router();

//admin
router.use('/admin', Auth);
router.use('/admin', Dashboard);
router.use('/admin', MangaAdmin);
router.use('/admin', ChapterAdmin);
router.use('/admin', CategoryAdmin);
router.use('/admin', TypeMangaAdmin);
router.use('/admin', ErrorMangaAdmin);

router.use('/', AuthorService);
router.use('/', CategoryService);
router.use('/', ListService);
router.use('/', IndexService);
router.use('/', MangaService);
router.use('/', ChapterService);




export default router;
