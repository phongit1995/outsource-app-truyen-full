import { Router } from 'express';
import { addCategoryListMiddleware } from './../../middleware/addCategoryList.middleware';
import { contact, introduce, ToS } from './site.controller';

const router = Router();

router.get('/lien-he', addCategoryListMiddleware, contact);
router.get('/gioi-thieu-xemtruyen-vn', addCategoryListMiddleware, introduce);
router.get('/dieu-khoan-su-dung', addCategoryListMiddleware, ToS);

export default router;
