import {isIOS} from './PlatformService';
import config from 'react-native-ultimate-config';
import {tryOpenURL} from 'core/helpers';

class UpdateService {
  openApplicationMarketplace() {
    const url = isIOS ? config.APP_STORE_URL_IOS : config.APP_STORE_URL_ANDROID;
    tryOpenURL(url);
  }
}

export const updateService = new UpdateService();
