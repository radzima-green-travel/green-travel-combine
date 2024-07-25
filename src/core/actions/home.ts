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
