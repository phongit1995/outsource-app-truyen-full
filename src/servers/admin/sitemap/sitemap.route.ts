import { Router } from 'express';
import { genderNewSiteMapController } from './sitemap.controller';
const router = Router();
router.get('/sitemap/render', genderNewSiteMapController);
export default router;
