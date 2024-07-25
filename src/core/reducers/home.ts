import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
} from 'core/actions/home';
import {CategoryShortDTO, ObjectShortDTO} from 'core/types/api';

interface HomePageState {
  categoriesList: Array<CategoryShortDTO>;
  objectsByCategory: Record<string, ObjectShortDTO[]>;
}

const initialState: HomePageState = {
  categoriesList: [],
  objectsByCategory: {},
};

export const homePageReducer = createReducer(initialState, builder => {
  builder.addMatcher(
    isAnyOf(
      getHomePageDataRequest.meta.successAction,
      refreshHomePageDataRequest.meta.successAction,
    ),
    (state, {payload}) => ({
      ...state,
      categoriesList: payload.categoriesList,
      objectsByCategory: payload.objectsByCategory,
    }),
  );
});
