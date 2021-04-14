import {ApiService} from 'services/ApiService';
import config from 'react-native-ultimate-config';
import {sentryService} from 'services/SentryService';

export class NativeApiService extends ApiService {
  constructor(baseURL: string) {
    super(baseURL);
    this.axiosInstance.interceptors.response.use(
      res => res,
      error => {
        sentryService.logResponseError(error);
        return Promise.reject(error);
      },
    );
  }
  protected getHeaders() {
    return {
      'x-api-key': config.NATIVE_CLIENT_API_KEY,
    };
  }
}

export const nativeClientApi = new NativeApiService(config.NATIVE_CLIENT_URL);
