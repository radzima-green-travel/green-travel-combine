import {ActionType, createAction, createReducer} from 'typesafe-actions';
import {AddVisitedObjectBody, VisitedObjectsData} from 'core/types';
import {ACTIONS} from '../constants';
import {filter, isEqual} from 'lodash';

export const getVisitedObjectsRequest = createAction(
  ACTIONS.GET_VISITED_OBJECTS_REQUEST,
)();
export const getVisitedObjectsSuccess = createAction(
  ACTIONS.GET_VISITED_OBJECTS_SUCCESS,
)<VisitedObjectsData>();
export const getVisitedObjectsFailure = createAction(
  ACTIONS.GET_VISITED_OBJECTS_FAILURE,
)<Error>();

export const addVisitedObjectRequest = createAction(
  ACTIONS.ADD_VISITED_OBJECT_REQUEST,
)<{
  objectId: string;
  data: AddVisitedObjectBody;
}>();
export const addVisitedObjectSuccess = createAction(
  ACTIONS.ADD_VISITED_OBJECT_SUCCESS,
)();
export const addVisitedObjectFailure = createAction(
  ACTIONS.ADD_VISITED_OBJECT_FAILURE,
)<Error>();

export const deleteVisitedObjectRequest = createAction(
  ACTIONS.DELETE_VISITED_OBJECT_REQUEST,
)<{
  objectId: string;
}>();
export const deleteVisitedObjectSuccess = createAction(
  ACTIONS.DELETE_VISITED_OBJECT_SUCCESS,
)();
export const deleteVisitedObjectFailure = createAction(
  ACTIONS.DELETE_VISITED_OBJECT_FAILURE,
)<Error>();

export const clearVisitedObjects = createAction(
  ACTIONS.CLEAR_VISITED_OBJECTS,
)();

interface IDefaultState {
  data: VisitedObjectsData;
}

const defaultState = {
  data: [],
};

const actions = {
  getVisitedObjectsSuccess,
  addVisitedObjectRequest,
  deleteVisitedObjectRequest,
  clearVisitedObjects,
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
  .handleAction(deleteVisitedObjectRequest, (state, {payload}) => {
    return {
      ...state,
      data: [
        ...filter(state.data, object => !isEqual(object.id, payload.objectId)),
      ],
    };
  })
  .handleAction(clearVisitedObjects, state => ({
    ...state,
    data: [],
  }));
