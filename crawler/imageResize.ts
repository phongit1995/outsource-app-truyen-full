import path from 'path';
import Jimp from 'jimp';
import { makeRadomText } from './../src/common/text.helper';
export const addWaterMarkImage = async (imageUrl: string) => {
    if (!imageUrl) {
        console.log('imageUrl', imageUrl);
        throw Error('ảnh ko đúng format');
    }
    const extendFile = imageUrl.split('.').pop();
    if (!extendFile) {
        throw Error('extends fail');
    }
    const fileName = makeRadomText(10) + '.' + extendFile;
    const filePath = path.join(__dirname, '../src/public/image', fileName);
    const waterMarkImg = path.join(__dirname, '/image/Watermark.png');
    const [image, logo] = await Promise.all([Jimp.read(imageUrl), Jimp.read(waterMarkImg)]);
    logo.resize(image.bitmap.width, image.bitmap.height);
    image.composite(logo, 0, 0).write(filePath);
    return fileName;
};
