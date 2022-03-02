import {Router} from 'express';
import {Authentication} from "../middleware/auth.middleware";
import {changeStatus, createAuthor, deleteAuthor, renderAuthor, renderCreate} from "./author.controller";
const router = Router();

router.get('/author', Authentication, renderAuthor);
router.get('/author/create', Authentication, renderCreate);
router.post('/author/delete', Authentication, deleteAuthor);
router.post('/author/store', Authentication, createAuthor);
router.post('/author/change-status', Authentication, changeStatus);

export default router;