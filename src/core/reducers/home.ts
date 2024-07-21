import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
  getCategoriesListDataRequest,
  getObjectsListDataRequest,
} from 'core/actions/home';
import {CategoryShortDTO, ObjectShortDTO, PaginatedList} from 'core/types/api';

interface HomePageState {
  categoriesList: Array<CategoryShortDTO>;
  objectsByCategory: Record<string, ObjectShortDTO[]>;
  categoriesListsById: Record<string, PaginatedList<CategoryShortDTO>>;
  objectsListsById: Record<string, PaginatedList<ObjectShortDTO>>;
}

const initialState: HomePageState = {
  categoriesList: [],
  objectsByCategory: {},
  categoriesListsById: {},
  objectsListsById: {},
};

export const homePageReducer = createReducer(initialState, builder => {
  builder
    .addMatcher(
      isAnyOf(
        getHomePageDataRequest.meta.successAction,
        refreshHomePageDataRequest.meta.successAction,
      ),
      (state, {payload}) => ({
        ...state,
        categoriesList: payload.categoriesList,
        objectsByCategory: payload.objectsByCategory,
      }),
    )
    .addMatcher(
      isAnyOf(getCategoriesListDataRequest.meta.successAction),
      (state, {payload: {data, total, nextToken, id}}) => {
        const existingData = state.categoriesListsById[id]?.data ?? [];

        state.categoriesListsById = {
          ...state.categoriesListsById,
          [id]: {
            data: [...existingData, ...data],
            nextToken,
            total,
          },
        };
      },
    )
    .addMatcher(
      isAnyOf(getObjectsListDataRequest.meta.successAction),
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
