import {IState} from 'core/store';
import {createSelector} from 'reselect';
import {selectAppLanguage} from 'core/selectors/settingsSelectors';
import {
  getBookmarksObjectsList,
  getProcessedBookmarksObjectsList,
  getProcessedBookmarksInitialObjectsData,
  getBookmarksCategories,
} from 'core/transformators/bookmarksDetails';
import {selectBookmarksIds} from 'core/selectors/user';

export const selectRawInitialObjectsData = (state: IState) =>
  state.bookmarksDetails.initialObjectsData;

export const selectProcessedInitialObjectsData = createSelector(
  selectRawInitialObjectsData,
  selectAppLanguage,
  (rawData, locale) => getProcessedBookmarksInitialObjectsData(rawData, locale),
);

export const selectBookmarksCategories = createSelector(
  selectProcessedInitialObjectsData,
  processedData => getBookmarksCategories(processedData),
);

export const selectRawBookmarksObjectsList = (state: IState) =>
  state.bookmarksDetails.objectsList;

export const selectProcessedBookmarksObjectsList = createSelector(
  selectRawBookmarksObjectsList,
  selectAppLanguage,
  (objectsListsById, locale) =>
    getProcessedBookmarksObjectsList(objectsListsById, locale),
);

export const selectBookmarksObjectsList = (id: string) =>
  createSelector(
    selectProcessedBookmarksObjectsList,
    selectBookmarksIds,
    (bookmarksDetails, bookmarksIds) =>
      getBookmarksObjectsList(bookmarksDetails, bookmarksIds, id),
  );
