import { Router } from 'express';
import { Authentication } from '../middleware/auth.middleware';
import { SupperAdminAuthentication } from '../middleware/authSupperAdmin.middleware';
import {
    createAdminController,
    createAdminControllerPost,
    deleteAdmin,
    listUserController,
} from './user.controller';
const router = Router();

router.get('/user', Authentication, listUserController);
router.get('/user/create', SupperAdminAuthentication, createAdminController);
router.post('/user/create', SupperAdminAuthentication, createAdminControllerPost);
router.delete('/user/delete/:id', SupperAdminAuthentication, deleteAdmin);
export default router;
