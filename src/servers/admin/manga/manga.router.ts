import {Router} from "express";
import {deleteManga, renderManga, renderUpdateManga, updateManga} from './manga.controller';
import {Authentication} from "../middleware/auth.middleware";

const router = Router();

router.get('/manga/update', Authentication, renderUpdateManga);
router.get('/manga', Authentication, renderManga);
router.get('/manga/:page', Authentication, renderManga);

router.post('/manga/delete', Authentication, deleteManga);
router.post('/manga/update', Authentication, updateManga);


export default router;
