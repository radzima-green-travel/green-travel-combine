import {createReducer} from '@reduxjs/toolkit';
import {getAppMapObjectsRequest} from 'core/actions/appMap';
import type {ObjectMapDTO} from 'core/types/api';

interface AppMapState {
  appMapObjects: Array<ObjectMapDTO>;
}

const initialState: AppMapState = {
  appMapObjects: [],
};

export const appMapReducer = createReducer(initialState, builder => {
  builder.addCase(
    getAppMapObjectsRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      appMapObjects: payload.appMapObjects,
    }),
  );
});
