import { Router } from 'express';
import { Authentication } from '../middleware/auth.middleware';
import { SupperAdminAuthentication } from '../middleware/authSupperAdmin.middleware';
import {
    adminUpdatePassword,
    createAdminController,
    createAdminControllerPost,
    deleteAdmin,
    listUserController,
    updateStatusAdmin,
} from './user.controller';
const router = Router();

router.get('/user', Authentication, listUserController);
router.get('/user/create', SupperAdminAuthentication, createAdminController);
router.post('/user/create', SupperAdminAuthentication, createAdminControllerPost);
router.delete('/user/delete/:id', SupperAdminAuthentication, deleteAdmin);
router.post('/user/update-status/:id', SupperAdminAuthentication, updateStatusAdmin);
router.put('/user/change-password/:id', SupperAdminAuthentication, adminUpdatePassword);
export default router;
