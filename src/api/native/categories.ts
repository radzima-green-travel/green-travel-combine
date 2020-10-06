import {nativeApi} from './nativeApi';
import {ICategoryWithItems} from 'core/types';

export function getCategories(): Promise<ICategoryWithItems[]> {
  return nativeApi.get('/object', {params: {mobile: true}});
}

export function getCategoriesList(): Promise<ICategoryWithItems[]> {
  return nativeApi.get('/categories');
}
