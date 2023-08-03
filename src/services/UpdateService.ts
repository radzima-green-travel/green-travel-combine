import {Linking} from 'react-native';
import {isIOS} from './PlatformService';
import config from 'react-native-ultimate-config';

class UpdateService {
  async openApplicationMarketplace() {
    const url = isIOS ? config.APP_STORE_URL_IOS : config.APP_STORE_URL_ANDROID;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  }
}

export const updateService = new UpdateService();
