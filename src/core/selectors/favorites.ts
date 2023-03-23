import {IState} from 'core/store';
import {reduce} from 'lodash';
import {createSelector} from 'reselect';

export const selectFavoritesData = (state: IState) => state.bookmarks.favorites;
export const selectLegacyBookmarksIds = (state: IState) =>
  state.bookmarks.bookmarksIds;

export const selectBookmarksIdsFromFavorites = createSelector(
  selectFavoritesData,
  favorites => {
    return reduce(
      favorites,
      (acc, value, objectId) => {
        const [status] = value;
        if (status) {
          acc.push(objectId);
        }

        return acc;
      },
      [] as string[],
    );
  },
);
