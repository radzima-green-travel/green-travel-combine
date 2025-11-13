import { Share } from 'react-native';
import { isIOS } from './PlatformService';

class ShareService {
  deepLinkDomain: string = '';
  constructor(deepLinkDomain: string) {
    this.deepLinkDomain = deepLinkDomain;
  }
  shareObject(objectId: string, title: string) {
    const url = `https://${this.deepLinkDomain}/object/${objectId}`;
    return Share.share({
      ...(isIOS
        ? {
            url: url,
          }
        : {
            message: url,
            title: title,
          }),
    });
  }
}

export const shareService = new ShareService(
  process.env.EXPO_PUBLIC_DEEP_LINK_DOMAIN as string,
);
