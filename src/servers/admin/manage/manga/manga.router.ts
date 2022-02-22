import {Router} from "express";
import {Authentication} from '../../auth/auth.controller';
import {renderManga} from './manga.controller'

const router = Router();

router.get('/manga', Authentication, renderManga);

export default router;
