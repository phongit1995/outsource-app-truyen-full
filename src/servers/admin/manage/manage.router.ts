import {Router, Request, Response} from "express";
import {Authentication} from '../auth/auth.controller';
import {renderDashboard} from "./manage.controller";

const router = Router();

router.get('/dashboard', Authentication, renderDashboard);

export default router;
