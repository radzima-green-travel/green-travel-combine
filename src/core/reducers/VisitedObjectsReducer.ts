import {ActionType, createAction, createReducer} from 'typesafe-actions';
import {AddVisitedBody, VisitedObjects} from 'core/types';
import {ACTIONS} from '../constants';

export const getVisitedObjectsRequest = createAction(ACTIONS.GET_VISITED_OBJECTS_REQUEST)();
export const getVisitedObjectsSuccess = createAction(
  ACTIONS.GET_VISITED_OBJECTS_SUCCESS,
)<VisitedObjects>();
export const getVisitedObjectsFailure = createAction(
  ACTIONS.GET_VISITED_OBJECTS_FAILURE,
)<Error>();

export const addVisitedObjectRequest = createAction(ACTIONS.ADD_VISITED_OBJECT_REQUEST)<{
  objectId: string;
  data: AddVisitedBody;
}>();
export const addVisitedObjectSuccess = createAction(ACTIONS.ADD_VISITED_OBJECT_SUCCESS)();
export const addVisitedObjectFailure = createAction(
  ACTIONS.ADD_VISITED_OBJECT_FAILURE,
)<Error>();

export const clearVisited = createAction(ACTIONS.CLEAR_VISITED_OBJECTS)();

interface IDefaultState {
  data: VisitedObjects;
}

const defaultState = {
  data: [],
};

const actions = {
  getVisitedObjectsSuccess,
  addVisitedObjectRequest,
  clearVisited,
};

export const visitedObjectsReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(getVisitedObjectsSuccess, (state, {payload}) => {
    return {
      ...state,
      data: payload,
    };
  })
  .handleAction(addVisitedObjectRequest, (state, {payload}) => {
    return {
      ...state,
      data: [
        ...state.data,
        {
          id: payload.objectId,
          timestamp: payload.data.timestamp,
        },
      ],
    };
  })
  .handleAction(clearVisited, state => ({
    ...state,
    data: [],
  }));
