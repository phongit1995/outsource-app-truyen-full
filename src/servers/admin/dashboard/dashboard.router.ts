import {Router, Request, Response} from "express";
import {renderDashboard} from "./dashboard.controller";
import {Authentication} from "../middleware/auth.middleware";

const router = Router();

router.get('/', Authentication, renderDashboard);

export default router;
