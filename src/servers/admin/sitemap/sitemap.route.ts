import { Router } from 'express';
import {
    genderNewSiteMapController,
    genderSiteMapAuthorController,
    genderSiteMapListController,
    sitemapIndexController,
} from './sitemap.controller';
const router = Router();
router.get('/sitemap', sitemapIndexController);
router.get('/sitemap/render', genderNewSiteMapController);
router.post('/sitemap/list', genderSiteMapListController);
router.post('/sitemap/author', genderSiteMapAuthorController);
export default router;
