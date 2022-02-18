import { Router } from 'express';
import { addNewList, detailList } from './list.controller';
const router = Router();
router.get('/danh-sach/:list', detailList);
router.post('/danh-sach', addNewList);
export default router;
