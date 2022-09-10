import {ApiService} from 'services/ApiService';
import config from 'react-native-ultimate-config';
import {sentryService} from 'services/SentryService';
import {
  etagCachingRequestInterceptor,
  etagCachingRespnseInterceptor,
} from './interceptors';

export class NativeApiService extends ApiService {
  constructor(baseURL: string) {
    super(baseURL);
    this.axiosInstance.interceptors.request.use(etagCachingRequestInterceptor);
    this.axiosInstance.interceptors.response.use(etagCachingRespnseInterceptor);
    this.axiosInstance.interceptors.response.use(
      res => res,
      error => {
        sentryService.logResponseError(error);
        return Promise.reject(error);
      },
    );
  }
}
export const restApi = new NativeApiService(
  config.NATIVE_CLIENT_INDEX_FILE_BASE_URL,
);
