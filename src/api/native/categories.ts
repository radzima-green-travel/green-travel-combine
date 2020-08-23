import {nativeApi} from './nativeApi';
import {ICategory} from 'core/types';

export function getCategories(): Promise<ICategory[]> {
  return nativeApi.get('/category');
}
