import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
  fetchNextRandomObjects,
  shiftRandomObjectList,
} from 'core/actions/home';
import {
  CategoryShortDTO,
  ObjectThumbnailDTO,
  PlaceOfTheWeekObjectDTO,
} from 'core/types/api';
import {drop} from 'lodash';

interface HomePageState {
  categoriesList: Array<CategoryShortDTO>;
  randomObjects: Array<ObjectThumbnailDTO>;
  placeOfTheWeek: PlaceOfTheWeekObjectDTO | null;
}

const initialState: HomePageState = {
  categoriesList: [],
  randomObjects: [],
  placeOfTheWeek: null,
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
      randomObjects: payload.randomObjects,
      placeOfTheWeek: payload.placeOfTheWeek,
    }),
  );
});
