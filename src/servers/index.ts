import express from 'express';
import IndexService from './home/home.router';
const router = express.Router();
router.use('/', IndexService);

export default router;
