import {Router} from 'express';
import {Authentication} from "../middleware/auth.middleware";
import {
    addDataAuthor,
    changeStatus,
    createAuthor,
    deleteAuthor,
    renderAuthor,
    renderCreate,
    renderUpdateAuthor,
    updateAuthor
} from "./author.controller";
const router = Router();

router.get('/author/update', Authentication, renderUpdateAuthor);
router.get('/author/create', Authentication, renderCreate);
router.get('/author', Authentication, renderAuthor);
router.get('/author/:page', Authentication, renderAuthor);
router.post('/author/delete', Authentication, deleteAuthor);
router.post('/author/update', Authentication, updateAuthor);
router.post('/author/store', Authentication, createAuthor);
router.post('/author/change-status', Authentication, changeStatus);
router.post('/author/add-data-author', addDataAuthor);

export default router;