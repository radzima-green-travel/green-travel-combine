import {isIOS} from './PlatformService';
import {tryOpenURL} from 'core/helpers';

class UpdateService {
  openApplicationMarketplace() {
    const url = isIOS
      ? process.env.EXPO_PUBLIC_APP_STORE_URL_IOS
      : process.env.EXPO_PUBLIC_APP_STORE_URL_ANDROID;
    tryOpenURL(url as string);
  }
}

export const updateService = new UpdateService();
