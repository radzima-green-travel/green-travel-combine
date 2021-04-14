import {nativeClientApi} from './nativeClientApi';
import {ICategory} from 'core/types';
import graphQLQuery from './graphQLQuery';

export function getCategories(): Promise<ICategory[]> {
  return nativeClientApi.post('', {query: graphQLQuery});
}
