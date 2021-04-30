import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';
import {ICoordinates, ILabelError, IObject} from '../types';
import {LineString, Feature} from '@turf/helpers';

export const showObjectDetailsMapDirectionRequest = createAction(
  ACTIONS.SHOW_OBJECT_DETAILS_MAP_DIRECTION_REQUEST,
)<{from: ICoordinates; to: ICoordinates}>();

export const showObjectDetailsMapDirectionSuccess = createAction(
  ACTIONS.SHOW_OBJECT_DETAILS_MAP_DIRECTION_SUCCESS,
)<{direction: Feature<LineString, unknown>; distance: null | string}>();

export const showObjectDetailsMapDirectionFailure = createAction(
  ACTIONS.SHOW_OBJECT_DETAILS_MAP_DIRECTION_FAILURE,
)<ILabelError>();

export const clearObjectDetailsMapDirection = createAction(
  ACTIONS.CLEAR_OBJECT_DETAILS_MAP_DIRECTION,
)();

export const setObjectDetailsMapObjects = createAction(
  ACTIONS.SET_OBJECT_DETAILS_MAP_OBJECTS,
)<IObject[]>();

interface IDefaultState {
  direction: Feature<LineString, unknown> | null;
  objects: IObject[] | null;
  distance: string | null;
}

const defaultState = {
  direction: null,
  objects: null,
  distance: null,
};

const actions = {
  showObjectDetailsMapDirectionRequest,
  showObjectDetailsMapDirectionSuccess,
  showObjectDetailsMapDirectionFailure,
  clearObjectDetailsMapDirection,
  setObjectDetailsMapObjects,
};

export const objectDetailsMapReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(showObjectDetailsMapDirectionSuccess, (state, {payload}) => {
    return {
      ...state,
      direction: payload.direction,
      distance: payload.distance,
    };
  })
  .handleAction(clearObjectDetailsMapDirection, () => {
    return {
      ...defaultState,
    };
  })
  .handleAction(setObjectDetailsMapObjects, (state, {payload}) => {
    return {
      ...state,
      objects: payload,
    };
  });
