import {Router} from "express";
import {renderManga} from './manga.controller';
import {Authentication} from "../middleware/auth.middleware";

const router = Router();

router.get('/manga', Authentication, renderManga);

export default router;
