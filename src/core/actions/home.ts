import { createAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'core/helpers';
import {
  CategoryShortDTO,
  ObjectThumbnailDTO,
  PlaceOfTheWeekObjectDTO,
} from 'core/types/api';
import { NewPlaceForm } from '../types/addNewPlace';

interface GetHomePageDataRequestPayload {
  categoriesList: CategoryShortDTO[];
  randomObjects: ObjectThumbnailDTO[];
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
  ObjectThumbnailDTO[]
>('FETCH_NEXT_RANDOM_OBJECTS');

export const shiftRandomObjectList = createAction('SHIFT_RANDOM_OBJECT_LIST');

export const submitNewPlaceFormRequest = createAsyncAction<
  NewPlaceForm.Schema,
  boolean,
  Error
>('SUBMIT_NEW_PLACE_FORM_REQUEST');
