import {createSelector} from 'reselect';
import {reduce} from 'lodash';
import {IState} from 'core/store';
import {ITransformedData, IBookmarksIds, IBookmarkItem} from 'core/types';
import {selectBookmarksIdsFromFavorites} from './favorites';
import {selectTransformedData} from './homeSelectors';

export const selectBookmarksCardsData = createSelector<
  IState,
  ITransformedData | null,
  IBookmarksIds,
  IBookmarkItem[] | null
>(
  selectTransformedData,
  selectBookmarksIdsFromFavorites,
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
