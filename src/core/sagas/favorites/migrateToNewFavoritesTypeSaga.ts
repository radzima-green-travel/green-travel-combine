import {put, select} from 'redux-saga/effects';
import {selectFavoritesData, selectLegacyBookmarksIds} from 'core/selectors';
import {setMigratedFavoritesAndClearLegacyIds} from 'core/reducers';

import {reduce} from 'lodash';

export function* migrateToNewFavoritesTypeSaga() {
  let favorites: ReturnType<typeof selectFavoritesData> = yield select(
    selectFavoritesData,
  );
  const legacyBookmarksIds: string[] = yield select(selectLegacyBookmarksIds);
  if (legacyBookmarksIds.length > 0) {
    favorites = reduce(
      legacyBookmarksIds,
      (acc, id) => {
        if (!acc[id]) {
          acc[id] = [true, Date.now()];
        }

        return acc;
      },
      favorites,
    );
    yield put(setMigratedFavoritesAndClearLegacyIds(favorites));
  }
}
