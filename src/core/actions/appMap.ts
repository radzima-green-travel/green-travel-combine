import {createAsyncAction} from 'core/helpers';
import {ObjectMapDTO} from 'core/types/api';

export const getAppMapObjectsRequest = createAsyncAction<
  void,
  {
    appMapObjects: ObjectMapDTO[];
  }
>('GET_APP_MAP_OBJECTS');
