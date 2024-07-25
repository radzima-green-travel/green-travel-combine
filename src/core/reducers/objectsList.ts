import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {
  getObjectsListInitialDataRequest,
  getObjectsListNextDataRequest,
} from 'core/actions';
import {ObjectsListsById} from 'core/types/objectsList';

interface ObjectsListState {
  objectsListsById: ObjectsListsById;
}

const initialState: ObjectsListState = {
  objectsListsById: {},
};

export const objectsListReducer = createReducer(initialState, builder => {
  builder.addMatcher(
    isAnyOf(
      getObjectsListInitialDataRequest.meta.successAction,
      getObjectsListNextDataRequest.meta.successAction,
    ),
    (state, {payload: {data, total, nextToken, id}}) => {
      const existingData = state.objectsListsById[id]?.data ?? [];

      state.objectsListsById = {
        ...state.objectsListsById,
        [id]: {
          data: [...existingData, ...data],
          nextToken,
          total,
        },
      };
    },
  );
});
