import {Router} from "express";
import {Authentication} from "../middleware/auth.middleware";
import {renderChapter} from "./chapter.controller";

const router = Router();

router.get('/chapter', Authentication, renderChapter);

export default router;