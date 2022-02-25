import { Router } from 'express';
import { addNewList, detailList } from './list.controller';
import { addCategoryListMiddleware } from './../../middleware/addCategoryList.middleware';
const router = Router();
router.get('/danh-sach/:list', addCategoryListMiddleware, detailList);
router.post('/danh-sach', addCategoryListMiddleware, addNewList);
export default router;
