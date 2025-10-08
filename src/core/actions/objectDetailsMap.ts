import {createAction} from '@reduxjs/toolkit';
import {ACTIONS} from 'core/constants';
import {createAsyncAction} from 'core/helpers';
import {ICoordinates, ILabelError, IObject} from 'core/types';
import type {Feature, LineString} from 'geojson';

export const showObjectDetailsMapDirectionRequest = createAsyncAction<
  {
    from: ICoordinates;
    to: ICoordinates;
  },
  {direction: Feature<LineString, unknown>; distance: null | string},
  ILabelError
>(ACTIONS.SHOW_OBJECT_DETAILS_MAP_DIRECTION);

export const clearObjectDetailsMapDirection = createAction(
  ACTIONS.CLEAR_OBJECT_DETAILS_MAP_DIRECTION,
);

export const setObjectDetailsMapObjects = createAction<IObject[]>(
  ACTIONS.SET_OBJECT_DETAILS_MAP_OBJECTS,
);
