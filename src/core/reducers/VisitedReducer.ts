import {ActionType, createAction, createReducer} from 'typesafe-actions';
import {AddVisitedBody, VisitedObjects} from 'core/types';
import {ACTIONS} from '../constants';

export const getVisitedRequest = createAction(ACTIONS.GET_VISITED_REQUEST)();
export const getVisitedSuccess = createAction(
  ACTIONS.GET_VISITED_SUCCESS,
)<VisitedObjects>();
export const getVisitedFailure = createAction(
  ACTIONS.GET_VISITED_FAILURE,
)<Error>();

export const addVisitedRequest = createAction(ACTIONS.ADD_VISITED_REQUEST)<{
  objectId: string;
  data: AddVisitedBody;
}>();
export const addVisitedSuccess = createAction(ACTIONS.ADD_VISITED_SUCCESS)();
export const addVisitedFailure = createAction(
  ACTIONS.ADD_VISITED_FAILURE,
)<Error>();

export const clearVisited = createAction(ACTIONS.CLEAR_VISITED)();

interface IDefaultState {
  visited: VisitedObjects;
}

const defaultState = {
  visited: [],
};

const actions = {
  getVisitedSuccess,
  addVisitedRequest,
  clearVisited,
};

export const visitedReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(getVisitedSuccess, (state, {payload}) => {
    return {
      ...state,
      visited: payload,
    };
  })
  .handleAction(addVisitedRequest, (state, {payload}) => {
    return {
      ...state,
      visited: [
        ...state.visited,
        {
          id: payload.objectId,
          timestamp: payload.data.timestamp,
        },
      ],
    };
  })
  .handleAction(clearVisited, state => ({
    ...state,
    visited: [],
  }));
