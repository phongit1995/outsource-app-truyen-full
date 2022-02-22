import {Router, Request, Response} from "express";
import {Authentication} from "../../auth/auth.controller";
import {renderDashboard} from "./dashboard.controller";

const router = Router();

router.get('/', Authentication, renderDashboard);

export default router;
