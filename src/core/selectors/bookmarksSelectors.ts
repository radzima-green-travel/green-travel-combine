import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {ICategoryWithItems, ICategory, IBookmarksIds} from 'core/types';
import {map, omit} from 'lodash';

export const selectBookmarksCategories = createSelector<
  IState,
  ICategoryWithItems[] | null,
  ICategory[] | null
>(
  (state) => state.home.data,
  (data) => (data ? map(data, (category) => omit(category, ['items'])) : null),
);

export const selectSavedBookmarksIds = createSelector<
  IState,
  IBookmarksIds | null,
  IBookmarksIds | null
>(
  (state) => state.bookmarks.savedBookmarksIds,
  (savedBookmarksIds) => savedBookmarksIds,
);
