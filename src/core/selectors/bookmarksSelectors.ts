import {createSelector} from 'reselect';
import {filter, reduce} from 'lodash';
import {IState} from 'core/store';
import {ITransformedData, IBookmarksIds, IBookmarkItem} from 'core/types';
import {selectBookmarksIds} from './common';
import {selectTransformedData} from './homeSelectors';

export const filteredBookmarksIds = createSelector<
  IState,
  ITransformedData | null,
  IBookmarksIds,
  IBookmarksIds
>(selectTransformedData, selectBookmarksIds, (transformedData, ids) =>
  transformedData
    ? filter(ids, id => Boolean(transformedData.objectsMap[id]))
    : [],
);

export const selectBookmarksCardsData = createSelector<
  IState,
  ITransformedData | null,
  IBookmarksIds,
  IBookmarkItem[] | null
>(
  selectTransformedData,
  filteredBookmarksIds,
  (transformedData, bookmarksIds) => {
    if (!transformedData) {
      return null;
    }

    const bookmarkItemMap = reduce(
      bookmarksIds,
      (acc, id) => {
        const categoryId = transformedData.objectsToCategoryMap[id];
        const category = transformedData.categoriesMap[categoryId];

        const bookmarkItem: IBookmarkItem = acc[categoryId] || {
          categoryId: categoryId,
          categoryName: category.name,
          objectsIds: [],
        };
        bookmarkItem.objectsIds = [...bookmarkItem.objectsIds, id];

        acc[categoryId] = {
          ...bookmarkItem,
        };
        return acc;
      },
      {} as {[key: string]: IBookmarkItem},
    );

    return Object.values(bookmarkItemMap);
  },
);
