import {nativeApi} from './nativeApi';
import {ICategoryWithObjects} from 'core/types';

export function getCategories(): Promise<ICategoryWithObjects[]> {
  return nativeApi.get('/object', {params: {mobile: true}});
}

export function getCategoriesList(): Promise<ICategoryWithObjects[]> {
  return nativeApi.get('/category');
}
