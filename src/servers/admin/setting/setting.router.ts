import { Router } from 'express';
import {
    settingController,
    updateSettingInfo,
    updateSettingScripts,
} from './setting.controller';
import multer from 'multer';
import path from 'path';
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
router.get('/setting', settingController);
router.post('/setting/update-scripts', updateSettingScripts);
router.post('/setting/update-info', upload.single('file'), updateSettingInfo);
export default router;
