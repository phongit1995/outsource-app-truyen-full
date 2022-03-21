import { Router } from 'express';
import {
    postWaterMarkController,
    settingAdsController,
    settingController,
    updateSettingAdsController,
    updateSettingInfo,
    updateSettingScripts,
    waterMarkController,
} from './setting.controller';
import multer from 'multer';
import path from 'path';
import { Authentication } from '../middleware/auth.middleware';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './../../../public/upload'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
    },
});
const upload = multer({
    storage: storage,
});
const router = Router();
router.get('/setting', Authentication, settingController);
router.post('/setting/update-scripts', Authentication, updateSettingScripts);
router.post('/setting/update-info', Authentication, upload.single('file'), updateSettingInfo);
router.get('/setting/ads', Authentication, settingAdsController);
router.get('/setting/watermark', waterMarkController);
router.post('/setting/watermark', upload.single('file'), postWaterMarkController);
router.post('/setting/update-ads', Authentication, updateSettingAdsController);
export default router;
