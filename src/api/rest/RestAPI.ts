import { RestApiEngine } from '../engines';

import { AppConfiguration } from 'core/types';
import { getAppVersion } from 'core/helpers';

export class RestAPI extends RestApiEngine {
  constructor(baseURL: string) {
    super(baseURL);
  }

  async getAppFeConfiguration(): Promise<AppConfiguration> {
    const appVersion = getAppVersion();
    const data = await this.get('', {
      baseURL: process.env.EXPO_PUBLIC_CONFIG_API_URL,
      headers: {
        'x-api-key': process.env.EXPO_PUBLIC_CONFIG_API_KEY,
        version: appVersion,
      },
    });

    return data;
  }
}
export const restAPI = new RestAPI(
  process.env.EXPO_PUBLIC_NATIVE_CLIENT_INDEX_FILE_BASE_URL as string,
);
