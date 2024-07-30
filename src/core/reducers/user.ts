import {createReducer} from '@reduxjs/toolkit';
import {
  addObjectIdToUserSearchHistory,
  deleteAllFromUserSearchHistory,
  deleteObjectIdFromUserSearchHistory,
} from 'core/actions';
import {filter, uniq} from 'lodash';

interface UserState {
  historyIds: string[];
}

const initialState: UserState = {
  historyIds: [],
};
export const userReducer = createReducer(initialState, builder => {
  builder.addCase(addObjectIdToUserSearchHistory, (state, {payload}) => ({
    ...state,
    historyIds: uniq([...state.historyIds, payload]),
  }));
  builder.addCase(deleteObjectIdFromUserSearchHistory, (state, {payload}) => ({
    ...state,
    historyIds: filter(state.historyIds, item => item !== payload),
  }));
  builder.addCase(deleteAllFromUserSearchHistory, state => ({
    ...state,
    historyIds: [],
  }));
});
