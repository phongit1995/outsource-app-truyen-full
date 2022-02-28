import {Router} from "express";
import {Authentication} from "../middleware/auth.middleware";
import {changeStatus, deleteChapter, renderChapter} from "./chapter.controller";

const router = Router();

router.get('/chapter', Authentication, renderChapter);
router.get('/chapter/:page', Authentication, renderChapter);
router.post('/chapter/change-status', Authentication, changeStatus);
router.post('/chapter/delete', Authentication, deleteChapter);

export default router;