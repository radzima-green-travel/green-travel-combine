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

        if (status && transformedData?.objectsMap[objectId]) {
          acc.push(objectId);
        }

        return acc;
      },
      [] as string[],
    );
  },
);
