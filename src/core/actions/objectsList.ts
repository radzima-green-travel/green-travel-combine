import {createAsyncAction} from 'core/helpers';
import {ObjectShortDTO} from 'core/types';

interface CategoriesListSuccessPayload {
  id: string;
  data: Array<ObjectShortDTO>;
  nextToken: string;
  total: number;
}

interface ObjectsListRequestPayload {
  categoryId: string;
  objectsIds?: string[];
}

export const getObjectsListInitialDataRequest = createAsyncAction<
  ObjectsListRequestPayload,
  CategoriesListSuccessPayload
>('GET_OBJECTS_LIST_INITIAL_DATA');

export const getObjectsListNextDataRequest = createAsyncAction<
  ObjectsListRequestPayload,
  CategoriesListSuccessPayload
>('GET_OBJECTS_LIST_NEXT_DATA');
