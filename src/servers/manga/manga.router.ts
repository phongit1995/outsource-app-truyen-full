import express from 'express';
import { detailMangaController } from './manga.controller';
const router = express.Router();
router.get('/:slug', detailMangaController);
export default router;
