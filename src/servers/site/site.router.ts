import {Router} from 'express';
import {contact, introduce, ToS} from "./site.controller";

const router = Router();

router.get('/lien-he', contact);
router.get('/gioi-thieu-xemtruyen-vn', introduce);
router.get('/dieu-khoan-su-dung', ToS);

export default router;