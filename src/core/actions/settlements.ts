import {SettlementsData, SettlementsParams} from 'core/types';
import {createAsyncAction} from 'core/helpers';

export const getSettlementsDataRequest = createAsyncAction<
  SettlementsParams | void,
  SettlementsData
>('GET_SETTLEMENTS_DATA');

export const getSettlementsNextDataRequest = createAsyncAction<
  SettlementsParams | void,
  SettlementsData
>('GET_SETTLEMENTS_NEXT_DATA');
