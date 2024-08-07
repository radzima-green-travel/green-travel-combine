import {SettlementsData} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  getSettlementsDataRequest,
  getSettlementsNextDataRequest,
} from 'core/actions';

interface SettlementsState {
  settlementsData: SettlementsData;
}

const initialState: SettlementsState = {
  settlementsData: {
    data: [],
    nextToken: '',
    total: 0,
  },
};

export const settlementsReducer = createReducer(initialState, builder => {
  builder
    .addCase(
      getSettlementsNextDataRequest.meta.successAction,
      (state, {payload: {data, total, nextToken}}) => ({
        ...state,
        settlementsData: {
          ...state.settlementsData,
          data: [...state.settlementsData.data, ...data],
          nextToken,
          total,
        },
      }),
    )
    .addCase(
      getSettlementsDataRequest.meta.successAction,
      (state, {payload}) => {
        return {
          ...state,
          settlementsData: payload,
        };
      },
    );
});
