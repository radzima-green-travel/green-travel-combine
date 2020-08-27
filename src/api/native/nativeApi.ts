import {ApiService} from 'services/ApiService';
import config from 'react-native-ultimate-config';

export class NativeApiService extends ApiService {
  // interceptors or specific logic is here
}

export const nativeApi = new NativeApiService(config.NATIVE_CLIENT_URL);
