import { Router } from 'express';
import { crawlerController, crawlerUpdateStatus } from './crawler.controller';
const route = Router();
route.get('/crawler', crawlerController);
route.post('/crawler/update', crawlerUpdateStatus);
export default route;
