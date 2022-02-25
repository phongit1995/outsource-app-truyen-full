import express from 'express';
import { indexController } from './home.controller';
const router = express.Router();
import { addCategoryListMiddleware } from './../../middleware/addCategoryList.middleware';
router.get('/', addCategoryListMiddleware, indexController);
export default router;
