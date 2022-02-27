import {Router} from "express";
import {deleteManga, renderManga} from './manga.controller';
import {Authentication} from "../middleware/auth.middleware";

const router = Router();

router.get('/manga', Authentication, renderManga);
router.post('/manga/delete', Authentication, deleteManga);

export default router;
