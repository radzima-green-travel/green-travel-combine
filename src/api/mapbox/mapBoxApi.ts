import {ApiService} from 'services/ApiService';
import config from 'react-native-ultimate-config';
import {sentryService} from 'services/SentryService';

export class NativeApiService extends ApiService {
  constructor(baseURL: string) {
    super(baseURL);
    this.axiosInstance.interceptors.response.use(
      res => res,
      error => {
        sentryService.logMapBoxError(error);
        return Promise.reject(error);
      },
    );
  }
}

export const mapBoxApi = new NativeApiService(config.MAP_BOX_CLIENT_URL);
