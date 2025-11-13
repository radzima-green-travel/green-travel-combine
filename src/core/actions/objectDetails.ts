import { createAsyncAction } from 'core/helpers';
import { ObjectDetailsResponseDTO } from 'core/types';

export const getObjectDetailsRequest = createAsyncAction<
  { objectId: string },
  {
    objectDetails: ObjectDetailsResponseDTO;
  }
>('GET_OBJECT_DETAILS');

export const clearObjectDetails = createAsyncAction('CLEAR_OBJECT_DETAILS');
