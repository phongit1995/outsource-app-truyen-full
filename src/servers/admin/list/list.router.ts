import { Router } from 'express';
import { Authentication } from '../middleware/auth.middleware';
import {
    addListController,
    addListHandleController,
    changeStatusListController,
    deleteListController,
    detailListController,
    listController,
    updateListController,
} from './list.controller';

const router = Router();

router.get('/danh-muc', Authentication, listController);
router.get('/danh-muc/detail/:id', Authentication, detailListController);
router.get('/danh-muc/add', Authentication, addListController);
router.post('/danh-muc/add', Authentication, addListHandleController);
router.post('/danh-muc/update/:id', Authentication, updateListController);
router.post('/danh-muc/update-status/:id', Authentication, changeStatusListController);
router.delete('/danh-muc/delete/:id', Authentication, deleteListController);

export default router;
