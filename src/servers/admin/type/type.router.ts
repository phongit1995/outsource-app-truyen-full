import {Router} from "express";
import {Authentication} from "../middleware/auth.middleware";
import {renderType} from "./type.controller";

const router = Router();

router.get('/type', Authentication, renderType);

export default router;