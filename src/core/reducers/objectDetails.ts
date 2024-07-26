import {createReducer} from '@reduxjs/toolkit';
import {clearObjectDetails, getObjectDetailsRequest} from 'core/actions';
import {IObject} from 'core/types';

interface ObjectDetailsState {
  objectDetails: IObject | null;
}

const initialState: ObjectDetailsState = {
  objectDetails: null,
};

export const objectDetailsReducer = createReducer(initialState, builder => {
  builder.addCase(
    getObjectDetailsRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      objectDetails: payload.objectDetails,
    }),
  );
  builder.addCase(clearObjectDetails, state => ({
    ...state,
    objectDetails: null,
  }));
});
