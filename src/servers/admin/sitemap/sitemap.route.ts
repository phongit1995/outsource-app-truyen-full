import { Router } from 'express';
import {
    genderSiteMapAuthorController,
    genderSiteMapListController,
    sitemapIndexController,
    genderSiteMapCategoryController,
} from './sitemap.controller';
const router = Router();
router.get('/sitemap', sitemapIndexController);
router.post('/sitemap/list', genderSiteMapListController);
router.post('/sitemap/author', genderSiteMapAuthorController);
router.post('/sitemap/category', genderSiteMapCategoryController);
export default router;
