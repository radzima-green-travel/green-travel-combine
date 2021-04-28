import config from 'react-native-ultimate-config';
import base64 from 'react-native-base64';
import {Buffer} from 'buffer';
const r = 999 / 664;
class ImagesService {
  getOriginalImage(cover: string) {
    // console.log(`${config.NATIVE_CLIENT_IMAGE_URL}/${cover}`);
    return `${config.NATIVE_CLIENT_IMAGE_URL}/${cover}`;
  }

  getImageProxy(
    cover: string,
    {fit, width, height, gravity, enlarge, extension},
  ) {
    console.log(width, height);
    const params = 'cover/999/664/center/1/webp';
    // console.log(
    //   `${config.NATIVE_CLIENT_IMAGE_URL}/${base64.encode(params)}/${cover}`,
    // );

    const base64String = Buffer.from(params).toString('base64');
    // console.log(base64.encode(params));
    // console.log(
    //   `${config.NATIVE_CLIENT_IMAGE_URL}/Y292ZXIvNTAwLzQwMC9jZW50ZXIvMS9wbmc=/${cover}`,
    // );
    console.log(`${config.NATIVE_CLIENT_IMAGE_URL}/${base64String}/${cover}`);
    console.log(base64String);
    return `${config.NATIVE_CLIENT_IMAGE_URL}/${base64String}/${cover}`;
  }
}

export const imagesService = new ImagesService();
