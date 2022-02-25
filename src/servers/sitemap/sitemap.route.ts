import { Router } from 'express';
import { renderSiteMap } from './sitemap.controller';
const route = Router();
route.get('/sitemap.xml', renderSiteMap);
export default route;
