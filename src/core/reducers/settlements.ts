import {SettlementsData} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {getSettlementsDataRequest} from 'core/actions';

interface SettlementsState {
  settlementsData: SettlementsData;
}

const initialState: SettlementsState = {
  settlementsData: [],
};

export const settlementsReducer = createReducer(initialState, builder => {
  builder.addCase(
    getSettlementsDataRequest.meta.successAction,
    (state, {payload}) => {
      return {
        ...state,
        settlementsData: payload,
      };
    },
  );
});
