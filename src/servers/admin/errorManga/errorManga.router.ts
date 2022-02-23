import {Router} from "express";
import {Authentication} from "../middleware/auth.middleware";
import {renderErrorManga} from "./errorManga.controller";

const router = Router();

router.get('/error-manga', Authentication, renderErrorManga);

export default router;