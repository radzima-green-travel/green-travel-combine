import {nativeApi} from './nativeApi';
import {IObject} from 'core/types';

export function getObjects(): Promise<IObject> {
  return nativeApi.get('/object');
}
