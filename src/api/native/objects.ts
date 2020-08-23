import {nativeApi} from './nativeApi';

export function getObjects() {
  return nativeApi.get('/object');
}
