import config from 'react-native-ultimate-config';
import base64 from 'react-native-base64';

class ImagesService {
  getOriginalImage(cover: string) {
    return `${config.NATIVE_CLIENT_IMAGE_URL}/${cover}`;
  }

  getImageProxy(cover: string) {
    const coverWithNewExtension = cover.split('.');
    const ext = coverWithNewExtension.pop();
    const fileName = coverWithNewExtension.join('.');

    const params = `cover/null/null/center/1/${ext}`;

    const base64String = base64.encode(params);

    return `${config.NATIVE_CLIENT_IMAGE_URL}/${base64String}/${fileName}.webp`;
  }
}

export const imagesService = new ImagesService();
