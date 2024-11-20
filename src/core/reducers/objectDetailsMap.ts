import {IObject} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  showObjectDetailsMapDirectionRequest,
  clearObjectDetailsMapDirection,
  setObjectDetailsMapObjects,
} from 'core/actions';
import {Feature, LineString} from '@turf/helpers';

interface InitialState {
  direction: Feature<LineString, unknown> | null;
  objects: IObject[] | null;
  distance: string | null;
}

const initialState: InitialState = {
  direction: null,
  objects: null,
  distance: null,
};

export const objectDetailsMapReducer = createReducer(initialState, builder => {
  builder
    .addCase(
      showObjectDetailsMapDirectionRequest.meta.successAction,
      (state, {payload}) => ({
        ...state,
        direction: payload.direction,
        distance: payload.distance,
      }),
    )
    .addCase(clearObjectDetailsMapDirection, () => initialState)
    .addCase(setObjectDetailsMapObjects, (state, {payload}) => ({
      ...state,
      objects: payload,
    }));
});
