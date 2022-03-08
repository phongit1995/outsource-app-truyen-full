import {Router} from "express";
import {Authentication} from "../middleware/auth.middleware";
import {
    changeStatus,
    deleteChapter,
    renderChapter,
    renderChapterSearched,
    renderUpdateChapter,
    updateChapter
} from "./chapter.controller";

const router = Router();

router.get('/chapter/search', Authentication, renderChapterSearched);
router.get('/chapter/update', Authentication, renderUpdateChapter);
router.get('/chapter', Authentication, renderChapter);
router.get('/chapter/:page', Authentication, renderChapter);


router.post('/chapter/change-status', Authentication, changeStatus);
router.post('/chapter/delete', Authentication, deleteChapter);
router.post('/chapter/update', Authentication, updateChapter);


export default router;