import {Router} from 'express';
import {getMangaByKey} from "./search.controller";

const router = Router();

router.get('/tim-kiem', getMangaByKey);

export default router;
