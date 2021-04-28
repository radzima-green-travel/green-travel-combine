import {xorBy} from 'lodash';
import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';
import {IMapFilter} from '../types';

export const setAppMapSelectedFilters = createAction(
  ACTIONS.SET_APP_MAP_SELECTED_FILTERS,
)<IMapFilter>();

export const clearAppMapSelectedFilters = createAction(
  ACTIONS.CLEAR_APP_MAP_SELECTED_FILTERS,
)();

export const setAppMapSelectedMarkerId = createAction(
  ACTIONS.SET_APP_MAP_SELECTED_MARKER_ID,
)<string>();

export const clearAppMapSelectedMarkerId = createAction(
  ACTIONS.CLEAR_APP_MAP_SELECTED_MARKER_ID,
)();

interface IDefaultState {
  selectedMarkerId: string | null;
  selectedFilters: IMapFilter[];
}

const defaultState = {
  selectedMarkerId: null,
  selectedFilters: [],
};

const actions = {
  setAppMapSelectedFilters,
  setAppMapSelectedMarkerId,
  clearAppMapSelectedFilters,
  clearAppMapSelectedMarkerId,
};

export const appMapReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(setAppMapSelectedFilters, (state, {payload}) => {
    return {
      ...state,
      selectedFilters: xorBy(state.selectedFilters, [payload], 'categoryId'),
    };
  })
  .handleAction(clearAppMapSelectedFilters, state => {
    return {
      ...state,
      selectedFilters: [],
    };
  })
  .handleAction(setAppMapSelectedMarkerId, (state, {payload}) => {
    return {
      ...state,
      selectedMarkerId: payload,
    };
  })
  .handleAction(clearAppMapSelectedMarkerId, state => {
    return {
      ...state,
      selectedMarkerId: null,
    };
  });
