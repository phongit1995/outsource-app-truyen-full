import { Router } from 'express';
import {
    genderSiteMapAuthorController,
    genderSiteMapListController,
    sitemapIndexController,
    genderSiteMapCategoryController,
    genderSiteMapCategoryDetailController,
    genderSiteMapChapterController,
    createSiteMapGenderController,
} from './sitemap.controller';
const router = Router();
router.get('/sitemap', sitemapIndexController);
router.post('/sitemap/gender', createSiteMapGenderController);
router.post('/sitemap/list', genderSiteMapListController);
router.post('/sitemap/author', genderSiteMapAuthorController);
router.post('/sitemap/category', genderSiteMapCategoryController);
router.post('/sitemap/category-detail', genderSiteMapCategoryDetailController);
router.post('/sitemap/chapter', genderSiteMapChapterController);
export default router;
