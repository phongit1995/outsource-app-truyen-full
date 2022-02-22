import express from 'express';
import IndexService from './home/home.router';
import MangaService from './manga/manga.router';
import ChapterService from './chapter/chapter.router';
import CategoryService from './category/category.router';
import ListService from './list/list.router';
import AuthorService from './author/author.router';
import Auth from './admin/auth/auth.router';
import Dashboard from './admin/manage/dashboard/dashboard.router';
import ManageAdmin from './admin/manage/manga/manga.router';
const router = express.Router();

//admin
router.use('/admin', Auth);
router.use('/admin', Dashboard);
router.use('/admin', ManageAdmin);

router.use('/', AuthorService);
router.use('/', CategoryService);
router.use('/', ListService);
router.use('/', IndexService);
router.use('/', MangaService);
router.use('/', ChapterService);




export default router;
