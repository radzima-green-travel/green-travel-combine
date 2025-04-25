import {createAsyncAction} from 'core/helpers';

export const navigationCallback = createAsyncAction<void, string>(
  'NAVIGATION_CALLBACK',
);
