import { Router } from 'express';
import { Authentication } from '../middleware/auth.middleware';
import { addListController, addListHandleController, listController } from './list.controller';

const router = Router();

router.get('/danh-muc', listController);
router.get('/danh-muc/edit');
router.get('/danh-muc/add', addListController);
router.post('/danh-muc/add', addListHandleController);

export default router;
