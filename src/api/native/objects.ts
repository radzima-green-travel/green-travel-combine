import {nativeApi} from './nativeApi';
import {IObject} from 'core/types';

export function getObjects(): Promise<IObject> {
  return nativeApi.get('/object');
}

export function getObjectsById(ids: Array<string>): Promise<IObject> {
  return nativeApi.get('/object', {
    params: {
      ids: ids,
    },
  });
}
