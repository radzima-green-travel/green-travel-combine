import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import {
  getCategoriesListNextDataRequest,
  getCategoriesListInitialDataRequest,
} from 'core/actions';
import { CategoriesListsById } from 'core/types';

interface CategoriesListState {
  categoriesListsById: CategoriesListsById;
}

const initialState: CategoriesListState = {
  categoriesListsById: {},
};

export const categoriesListReducer = createReducer(initialState, builder => {
  builder.addMatcher(
    isAnyOf(
      getCategoriesListInitialDataRequest.meta.successAction,
      getCategoriesListNextDataRequest.meta.successAction,
    ),
    (
      state,
      { payload: { data, total, nextToken, id, requestedItemsCount } },
    ) => {
      const existingData = state.categoriesListsById[id]?.data ?? [];
      const existingRequestedItemsCount =
        state.categoriesListsById[id]?.requestedItemsCount ?? 0;

      state.categoriesListsById = {
        ...state.categoriesListsById,
        [id]: {
          data: [...existingData, ...data],
          requestedItemsCount:
            existingRequestedItemsCount + requestedItemsCount,
          nextToken,
          total,
        },
      };
    },
  );
});
