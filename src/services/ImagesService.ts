import config from 'react-native-ultimate-config';
import base64 from 'react-native-base64';
class ImagesService {
  getOriginalImage(cover: string) {
    return `${config.NATIVE_CLIENT_IMAGE_URL}/${cover}`;
  }

  getImageProxy(cover: string, width?: number) {
    const coverWithNewExtension = cover.split('.');
    const ext = coverWithNewExtension.pop();
    const fileName = coverWithNewExtension.join('.');
    const imageWidth = width ? Math.floor(width * 2) : 'null';

    const params = `cover/${imageWidth}/null/center/1/${ext}`;

    const base64String = base64.encode(params);

    return `${config.NATIVE_CLIENT_IMAGE_URL}/${base64String}/${fileName}.webp`;
  }
}

export const imagesService = new ImagesService();
