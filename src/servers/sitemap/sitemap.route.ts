import { Router } from 'express';
import { getSiteMapController, renderSiteMap } from './sitemap.controller';
const route = Router();
route.get('/sitemap/:name', getSiteMapController);
route.get('/sitemap.xml', renderSiteMap);

export default route;
