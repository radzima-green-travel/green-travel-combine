import {RestApiEngine} from '../engines';
import config from 'react-native-ultimate-config';
import {
  etagCachingRequestInterceptor,
  etagCachingRespnseInterceptor,
} from './interceptors';
import {AppConfiguration, SupportedLocales} from 'core/types';
import {ListMobileDataQuery} from '../graphql/types';
import {getAppVersion} from 'core/helpers';

export class RestAPI extends RestApiEngine {
  constructor(baseURL: string) {
    super(baseURL);
  }

  applyInterceptors(): void {
    super.applyInterceptors();
    this.axiosInstance.interceptors.request.use(etagCachingRequestInterceptor);
    this.axiosInstance.interceptors.response.use(etagCachingRespnseInterceptor);
  }

  async getAllAppDataFromIndex({
    locale,
  }: {
    locale: SupportedLocales;
  }): Promise<ListMobileDataQuery | null> {
    const data = await this.get(`/objects_v1_${locale}.json`);

    if (!data) {
      return null;
    }

    return {listMobileData: data};
  }

  async getAppFeConfiguration(): Promise<AppConfiguration> {
    const appVersion = getAppVersion();
    const data = await this.get('/dev', {
      baseURL: config.CONFIG_API_URL,
      headers: {
        'x-api-key': config.CONFIG_API_KEY,
        version: appVersion,
      },
    });

    return data;
  }
}
export const restAPI = new RestAPI(config.NATIVE_CLIENT_INDEX_FILE_BASE_URL);
