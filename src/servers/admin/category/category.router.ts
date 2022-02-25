import {Router} from "express";
import {changeStatus, handleCreate, handleDelete, renderCategory, renderCreate} from './category.controller';
import {Authentication} from "../middleware/auth.middleware";

const router = Router();

router.get('/category', Authentication, renderCategory);
router.get('/category/create', Authentication, renderCreate);
router.post('/category/store', Authentication, handleCreate);
router.post('/category/delete', Authentication, handleDelete);
router.post('/category/change-status', Authentication, changeStatus);

export default router;
