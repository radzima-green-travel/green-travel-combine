import {IState} from 'core/store';
import {reduce} from 'lodash';
import {createSelector} from 'reselect';
import {selectTransformedData} from './homeSelectors';

export const selectFavoritesData = (state: IState) => state.bookmarks.favorites;
export const selectLegacyBookmarksIds = (state: IState) =>
  state.bookmarks.bookmarksIds;

export const selectBookmarksIdsFromFavorites = createSelector(
  selectFavoritesData,
  selectTransformedData,
  (favorites, transformedData) => {
    return reduce(
      favorites,
      (acc, value, objectId) => {
        const [status] = value;

        const categoryId = transformedData?.objectsToCategoryMap[objectId];
        const category = categoryId
          ? transformedData?.categoriesMap?.[categoryId]
          : null;

        if (status && transformedData?.objectsMap[objectId] && category) {
          acc.push(objectId);
        }

        return acc;
      },
      [] as string[],
    );
  },
);
