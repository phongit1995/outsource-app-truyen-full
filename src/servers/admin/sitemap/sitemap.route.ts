import { Router } from 'express';
import {
    genderSiteMapAuthorController,
    genderSiteMapListController,
    sitemapIndexController,
    genderSiteMapCategoryController,
    genderSiteMapCategoryDetailController,
} from './sitemap.controller';
const router = Router();
router.get('/sitemap', sitemapIndexController);
router.post('/sitemap/list', genderSiteMapListController);
router.post('/sitemap/author', genderSiteMapAuthorController);
router.post('/sitemap/category', genderSiteMapCategoryController);
router.post('/sitemap/category-detail', genderSiteMapCategoryDetailController);
export default router;
