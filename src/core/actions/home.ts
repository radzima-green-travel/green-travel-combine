import {createAction} from '@reduxjs/toolkit';
import {createAsyncAction} from 'core/helpers';
import {
  CategoryShortDTO,
  ObjectShortDTO,
  ObjectThumbnailDTO,
  PlaceOfTheWeekObjectDTO,
} from 'core/types/api';

interface GetHomePageDataRequestPayload {
  categoriesList: Array<CategoryShortDTO>;
  objectsByCategory: Record<string, ObjectShortDTO[]>;
  randomObjects: Array<ObjectThumbnailDTO>;
  placeOfTheWeek: PlaceOfTheWeekObjectDTO;
}

export const getHomePageDataRequest = createAsyncAction<
  void,
  GetHomePageDataRequestPayload
>('GET_HOME_PAGE_DATA');

export const refreshHomePageDataRequest = createAsyncAction<
  void,
  GetHomePageDataRequestPayload
>('REFRESH_HOME_PAGE_DATA');

export const fetchNextRandomObjects = createAsyncAction<
  void,
  Array<ObjectThumbnailDTO>
>('FETCH_NEXT_RANDOM_OBJECTS');

export const shiftRandomObjectList = createAction('SHIFT_RANDOM_OBJECT_LIST');
