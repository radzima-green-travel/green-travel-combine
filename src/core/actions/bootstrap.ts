import { createAsyncAction } from 'core/helpers';
import { ILabelError } from 'core/types';
import { ACTIONS } from 'core/constants';

export const bootstrapRequest = createAsyncAction<void, void, ILabelError>(
  ACTIONS.BOOTSTRAP,
);
