import express from 'express';
import { indexController } from './home.controller';
const router = express.Router();
router.get('/', indexController);
export default router;
