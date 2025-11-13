import { SettlementsData } from 'core/types';
import { createAsyncAction } from 'core/helpers';

export const getSettlementsDataRequest = createAsyncAction<
  void,
  SettlementsData
>('GET_SETTLEMENTS_DATA');
