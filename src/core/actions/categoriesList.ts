import {createAsyncAction} from 'core/helpers';
import {CategoryShortDTO} from 'core/types';

interface CategoriesListSuccessPayload {
  id: string;
  data: Array<CategoryShortDTO>;
  requestedItemsCount: number;
  nextToken: string;
  total: number;
}

export const getCategoriesListInitialDataRequest = createAsyncAction<
  string,
  CategoriesListSuccessPayload
>('GET_CATEGORIES_LIST_INITIAL_DATA');

export const getCategoriesListNextDataRequest = createAsyncAction<
  string,
  CategoriesListSuccessPayload
>('GET_CATEGORIES_LIST_NEXT_DATA');
