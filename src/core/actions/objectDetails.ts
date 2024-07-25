import {createAsyncAction} from 'core/helpers';
import {IObject} from 'core/types';

export const getObjectDetailsRequest = createAsyncAction<
  {objectId: string},
  {
    objectDetails: IObject;
  }
>('GET_OBJECT_DETAILS');

export const clearObjectDetails = createAsyncAction('CLEAR_OBJECT_DETAILS');
