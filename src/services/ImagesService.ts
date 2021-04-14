import {SCREEN_WIDTH} from './PlatformService';
import config from 'react-native-ultimate-config';

class ImagesService {
  getOriginalImage(cover: string) {
    return `${config.NATIVE_CLIENT_IMAGE_URL}/${cover}`;
  }

  getImageProxy({fit, width, height, gravity, enlarge, extension}) {}
}

export const imagesService = new ImagesService();
