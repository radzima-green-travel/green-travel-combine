import {ShareExperienceInitialData, VisitedObjectsData} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  getVisitedObjectsRequest,
  deleteVisitedObjectRequest,
  clearVisitedObjects,
  setShareExperienceData,
  clearShareExperienceData,
  addVisitedObjectRequest,
} from 'core/actions';
import {filter, isEqual, some} from 'lodash';

interface InitialState {
  data: VisitedObjectsData;
  shareExperienceData: ShareExperienceInitialData | null;
}

const initialState: InitialState = {
  data: [],
  shareExperienceData: null,
};

export const visitedObjectsReducer = createReducer(initialState, builder => {
  builder
    .addCase(
      getVisitedObjectsRequest.meta.successAction,
      (state, {payload}) => {
        const locallyVisitedObjects = filter(state.data, object => {
          return !some(payload, ({id}) => isEqual(id, object.id));
        });
        return {
          ...state,
          data: [...payload, ...locallyVisitedObjects],
        };
      },
    )
    .addCase(addVisitedObjectRequest, (state, {payload}) => {
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
    .addCase(deleteVisitedObjectRequest, (state, {payload}) => ({
      ...state,
      data: [
        ...filter(state.data, object => !isEqual(object.id, payload.objectId)),
      ],
    }))
    .addCase(clearVisitedObjects, state => ({
      ...state,
      data: [],
    }))
    .addCase(setShareExperienceData, (state, {payload}) => ({
      ...state,
      shareExperienceData: payload,
    }))
    .addCase(clearShareExperienceData, state => ({
      ...state,
      shareExperienceData: null,
    }));
});
