import {createAsyncAction} from 'core/helpers';
import {ObjectShortDTO} from 'core/types';

export interface ObjectsListSuccessPayload {
  id: string;
  data: Array<ObjectShortDTO>;
  nextToken: string;
  total: number;
  categoryId: string;
}

interface ObjectsListRequestPayload {
  categoryId: string;
  objectsIds?: string[];
}

export const getObjectsListInitialDataRequest = createAsyncAction<
  ObjectsListRequestPayload,
  ObjectsListSuccessPayload
>('GET_OBJECTS_LIST_INITIAL_DATA');

export const getObjectsListNextDataRequest = createAsyncAction<
  ObjectsListRequestPayload,
  ObjectsListSuccessPayload
>('GET_OBJECTS_LIST_NEXT_DATA');
