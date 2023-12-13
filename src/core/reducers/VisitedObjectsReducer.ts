import {ActionType, createAction, createReducer} from 'typesafe-actions';
import {AddVisitedObjectRequestBody, VisitedObjectsData} from 'core/types';
import {ACTIONS} from '../constants';

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
)<AddVisitedObjectRequestBody>();
export const addVisitedObjectSuccess = createAction(
  ACTIONS.ADD_VISITED_OBJECT_SUCCESS,
)();
export const addVisitedObjectFailure = createAction(
  ACTIONS.ADD_VISITED_OBJECT_FAILURE,
)<Error>();

export const setPreparedVisitedObject = createAction(
  ACTIONS.SET_PREPARED_VISITED_OBJECT,
)<AddVisitedObjectRequestBody | null>();

export const clearVisitedObjects = createAction(
  ACTIONS.CLEAR_VISITED_OBJECTS,
)();

interface IDefaultState {
  data: VisitedObjectsData;
  preparedVisitedObject: AddVisitedObjectRequestBody | null;
}

const defaultState = {
  data: [],
  preparedVisitedObject: null,
};

const actions = {
  getVisitedObjectsSuccess,
  addVisitedObjectRequest,
  setPreparedVisitedObject,
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
      preparedVisitedObject: null,
    };
  })
  .handleAction(setPreparedVisitedObject, (state, {payload}) => {
    return {
      ...state,
      preparedVisitedObject: payload,
    };
  })
  .handleAction(clearVisitedObjects, () => ({
    ...defaultState,
  }));
