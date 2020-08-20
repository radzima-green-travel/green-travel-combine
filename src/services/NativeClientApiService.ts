import {ApiService} from './ApiService';
import config from 'react-native-ultimate-config';

export class NativeClientApiService extends ApiService {
  protected _credentials = {URL: config.NATIVE_CLIENT_URL};
}
