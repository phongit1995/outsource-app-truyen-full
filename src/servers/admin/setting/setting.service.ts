import { SettingModel, ESettingEnumType } from './../../../models/setting.model';
const keyCacheSettingAds = 'CACHE_SETTING_ADS';
import { cacheService } from './../../../common/cache.helper';
export class SettingService {
    public static async getSettingScripts() {
        const settingScripts = await SettingModel.findOne({
            type: ESettingEnumType.scripts,
        });
        if (settingScripts) {
            return settingScripts;
        }
        return SettingModel.create({ type: ESettingEnumType.scripts });
    }
    public static async updateSettingScripts(header: string, footer: string) {
        await SettingModel.updateOne(
            { type: ESettingEnumType.scripts },
            {
                header,
                footer,
            },
        );
    }
    public static async getSettingInfo() {
        const settingInfo = await SettingModel.findOne({ type: ESettingEnumType.info });
        if (settingInfo) {
            return settingInfo;
        }
        return SettingModel.create({ type: ESettingEnumType.info });
    }
    public static async updateSettingInfo(data: any) {
        return SettingModel.updateOne({ type: ESettingEnumType.info }, { ...data });
    }
    public static async getSettingAds() {
        const setting = await SettingModel.findOne({ type: ESettingEnumType.ads });
        if (setting) {
            return setting;
        }
        return SettingModel.create({ type: ESettingEnumType.ads });
    }
    public static async updateSettingAds(data: any) {
        cacheService.del(keyCacheSettingAds);
        return SettingModel.updateOne({ type: ESettingEnumType.ads }, { ...data });
    }
    public static async getSettingAdsCache() {
        const dataCache = cacheService.get(keyCacheSettingAds);
        if (dataCache) {
            return dataCache;
        }
        let setting = await SettingModel.findOne({ type: ESettingEnumType.ads });
        if (setting) {
            return setting;
        }
        setting = await SettingModel.create({ type: ESettingEnumType.ads });
        cacheService.set(keyCacheSettingAds, 60 * 30);
    }
}
