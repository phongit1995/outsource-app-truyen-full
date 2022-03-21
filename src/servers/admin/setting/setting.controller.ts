import { Request, Response } from 'express';
import { SettingService } from './setting.service';

export const settingController = async (req: Request, res: Response) => {
    const [settingScripts, settingInfo] = await Promise.all([
        SettingService.getSettingScripts(),
        SettingService.getSettingInfo(),
    ]);
    res.render('admin/setting/scripts', {
        settingScripts,
        settingInfo,
    });
};
export const updateSettingScripts = async (req: Request, res: Response) => {
    await SettingService.updateSettingScripts(req.body.header, req.body.footer);
    res.redirect('/admin/setting');
};
export const updateSettingInfo = async (req, res: Response) => {
    console.log(req.body);
    console.log(req.file);
    const result: any = { ...req.body };
    if (req.file) {
        result.logo = '/upload/' + req.file.filename;
    }
    await SettingService.updateSettingInfo(result);
    res.redirect('/admin/setting');
};
export const settingAdsController = async (req: Request, res: Response) => {
    const adsSetting = await SettingService.getSettingAds();
    res.render('admin/setting/ads', {
        adsSetting,
    });
};
export const updateSettingAdsController = async (req: Request, res: Response) => {
    await SettingService.updateSettingAds(req.body);
    res.redirect('/admin/setting/ads');
};
export const waterMarkController = async (req: Request, res: Response) => {
    const watermarkSetting = await SettingService.getSettingWatermark();
    console.log(watermarkSetting);
    res.render('admin/setting/watermark', {
        watermarkSetting,
    });
};
export const postWaterMarkController = async (req: Request | any, res: Response) => {
    if (req.file) {
        const watermark = '/upload/' + req.file.filename;
        await SettingService.updateSettingWatermark(watermark);
        return res.redirect('/admin/setting/watermark');
    }
    return res.send('Lỗi');
};
