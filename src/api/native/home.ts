import {nativeClientApi} from './nativeClientApi';

export function getCategories() {
  return nativeClientApi.get('/objects.json');
}
