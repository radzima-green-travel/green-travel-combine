import config from 'react-native-ultimate-config';
import base64 from 'react-native-base64';
import {SCREEN_WIDTH} from './PlatformService';

class ImagesService {
  getOriginalImage(cover: string) {
    return `${config.NATIVE_CLIENT_IMAGE_URL}/${cover}`;
  }

  getImageProxy(cover: string) {
    const params = `cover/${Math.floor(SCREEN_WIDTH * 2)}/null/center/1/webp`;

    const base64String = base64.encode(params);

    return `${config.NATIVE_CLIENT_IMAGE_URL}/${base64String}/${cover}`;
  }
}

export const imagesService = new ImagesService();
