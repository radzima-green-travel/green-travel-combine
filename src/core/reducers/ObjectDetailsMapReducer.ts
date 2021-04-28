import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';
import {ICoordinates, ILabelError} from '../types';
import {LineString, Feature} from '@turf/helpers';

export const showObjectDetailsMapDirectionRequest = createAction(
  ACTIONS.SHOW_OBJECT_DETAILS_MAP_DIRECTION_REQUEST,
)<{from: ICoordinates; to: ICoordinates}>();

export const showObjectDetailsMapDirectionSuccess = createAction(
  ACTIONS.SHOW_OBJECT_DETAILS_MAP_DIRECTION_SUCCESS,
)<Feature<LineString, unknown>>();

export const showObjectDetailsMapDirectionFailure = createAction(
  ACTIONS.SHOW_OBJECT_DETAILS_MAP_DIRECTION_FAILURE,
)<ILabelError>();

export const clearObjectDetailsMapDirection = createAction(
  ACTIONS.CLEAR_OBJECT_DETAILS_MAP_DIRECTION,
)();

interface IDefaultState {
  direction: Feature<LineString, unknown> | null;
}

const defaultState = {
  direction: null,
};

const actions = {
  showObjectDetailsMapDirectionRequest,
  showObjectDetailsMapDirectionSuccess,
  showObjectDetailsMapDirectionFailure,
  clearObjectDetailsMapDirection,
};

export const objectDetailsMapReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(showObjectDetailsMapDirectionSuccess, (state, {payload}) => {
    return {
      ...state,
      direction: payload,
    };
  })
  .handleAction(clearObjectDetailsMapDirection, () => {
    return {
      ...defaultState,
    };
  });
