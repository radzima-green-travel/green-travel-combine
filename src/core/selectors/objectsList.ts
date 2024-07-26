import {IState} from 'core/store';
import {createSelector} from 'reselect';
import {selectAppLanguage} from 'core/selectors/settingsSelectors';
import {
  getProcessedObjectsLists,
  prepareObjectsListData,
} from 'core/transformators/objectsList';

export const selectRawObjectsListsById = (state: IState) =>
  state.objectsList.objectsListsById;

export const selectProcessedObjectsListsById = createSelector(
  selectRawObjectsListsById,
  selectAppLanguage,
  (objectsListsById, locale) =>
    getProcessedObjectsLists(objectsListsById, locale),
);

export const selectObjectsList = (categoryId: string) =>
  createSelector(selectProcessedObjectsListsById, objectsList =>
    prepareObjectsListData(objectsList, categoryId),
  );
