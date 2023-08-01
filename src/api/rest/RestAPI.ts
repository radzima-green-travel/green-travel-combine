import {RestApiEngine} from '../engines';
import config from 'react-native-ultimate-config';
import {
  etagCachingRequestInterceptor,
  etagCachingRespnseInterceptor,
} from './interceptors';
import {SupportedLocales} from 'core/types';
import {ListMobileDataQuery} from '../graphql/types';

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

  async getAppFeConfiguration(): Promise<ListMobileDataQuery | null> {
    const data = await this.get('/dev', {
      baseURL:
        'https://hyy6w3shah.execute-api.eu-central-1.amazonaws.com/default/config',
      headers: {
        'x-api-key': '',
        version: 5,
      },
    });

    return data;
  }
}
export const restAPI = new RestAPI(config.NATIVE_CLIENT_INDEX_FILE_BASE_URL);

// 1) Add getAppFeConfiguration to RestAPI
// 2) add new env variables i.e. CONFIG_API_URL, CONFIG_API_KEY
// 3) create saga getAppFeConfigurationSaga, create reducer AppReducer - configuration
// 4) create selectors, selecteIsUpdateRequired, selecteIsUpdateAvailable -> compare(currentVersopn, versionFromConfig).lib
// 5) read values in your screen and based on it show corresponding pop up
// 6) add persisted value to skip optional update
