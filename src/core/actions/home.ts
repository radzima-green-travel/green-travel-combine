import {createAsyncAction} from 'core/helpers';
import {CategoryShortDTO, ObjectShortDTO} from 'core/types/api';

export const getHomePageDataRequest = createAsyncAction<
  void,
  {
    categoriesList: Array<CategoryShortDTO>;
    objectsByCategory: Record<string, ObjectShortDTO[]>;
  }
>('GET_HOME_PAGE_DATA');

export const refreshHomePageDataRequest = createAsyncAction<
  void,
  {
    categoriesList: Array<CategoryShortDTO>;
    objectsByCategory: Record<string, ObjectShortDTO[]>;
  }
>('REFRESH_HOME_PAGE_DATA');

export const getCategoriesListDataRequest = createAsyncAction<
  string,
  {
    id: string;
    data: Array<CategoryShortDTO>;
    nextToken: string;
    total: number;
  }
>('GET_CATEGORIES_LIST_DATA');

export const getObjectsListDataRequest = createAsyncAction<
  {categoryId: string; objectsIds?: string[]},
  {
    id: string;
    data: Array<ObjectShortDTO>;
    nextToken: string;
    total: number;
  }
>('GET_OBJECTS_LIST_DATA');
