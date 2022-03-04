import {Router} from 'express';
import {createReport, getReportOnePage, changeStatus} from "./report.controller";
import {Authentication} from "../middleware/auth.middleware";
const router = Router();

router.get('/report', Authentication, getReportOnePage);
router.get('/report/:page', Authentication, getReportOnePage);
router.post('/report/create', createReport);
router.post('/report/change-status', Authentication, changeStatus);

export default router;
