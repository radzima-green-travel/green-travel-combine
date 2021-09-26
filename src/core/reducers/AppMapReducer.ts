import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';

export const setAppMapSelectedMarkerId = createAction(
  ACTIONS.SET_APP_MAP_SELECTED_MARKER_ID,
)<string>();

export const clearAppMapSelectedMarkerId = createAction(
  ACTIONS.CLEAR_APP_MAP_SELECTED_MARKER_ID,
)();

interface IDefaultState {
  selectedMarkerId: string | null;
}

const defaultState = {
  selectedMarkerId: null,
};

const actions = {
  setAppMapSelectedMarkerId,
  clearAppMapSelectedMarkerId,
};

export const appMapReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
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
