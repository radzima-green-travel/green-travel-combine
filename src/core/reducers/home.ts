import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
  fetchNextRandomObjects,
  shiftRandomObjectList,
} from 'core/actions/home';
import {
  CategoryShortDTO,
  ObjectShortDTO,
  ObjectThumbnailDTO,
} from 'core/types/api';
import {drop} from 'lodash';

interface HomePageState {
  categoriesList: Array<CategoryShortDTO>;
  objectsByCategory: Record<string, ObjectShortDTO[]>;
  randomObjects: Array<ObjectThumbnailDTO>;
}

const initialState: HomePageState = {
  categoriesList: [],
  objectsByCategory: {},
  randomObjects: [],
};

export const homePageReducer = createReducer(initialState, builder => {
  builder.addCase(
    fetchNextRandomObjects.meta.successAction,
    (state, {payload}) => ({
      ...state,
      randomObjects: payload,
    }),
  );
  builder.addCase(shiftRandomObjectList, state => {
    return {
      ...state,
      randomObjects: drop(state.randomObjects, 1),
    };
  });
  builder.addMatcher(
    isAnyOf(
      getHomePageDataRequest.meta.successAction,
      refreshHomePageDataRequest.meta.successAction,
    ),
    (state, {payload}) => ({
      ...state,
      categoriesList: payload.categoriesList,
      objectsByCategory: payload.objectsByCategory,
      randomObjects: payload.randomObjects,
    }),
  );
});
