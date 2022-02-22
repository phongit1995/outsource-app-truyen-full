import {Router} from "express";
import {renderCategory} from './category.controller';
import {Authentication} from "../middleware/auth.middleware";

const router = Router();

router.get('/category', Authentication, renderCategory);

export default router;
