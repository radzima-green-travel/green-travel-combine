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
}
export const restAPI = new RestAPI(config.NATIVE_CLIENT_INDEX_FILE_BASE_URL);
