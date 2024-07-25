import {IState} from 'core/store';
import {createSelector} from 'reselect';
import {selectAppLanguage} from 'core/selectors/settingsSelectors';
import {
  getProcessedCategoriesLists,
  prepareCategoriesListData,
} from 'core/transformators/categoriesList';

export const selectRawCategoriesListsById = (state: IState) =>
  state.categoriesList.categoriesListsById;

export const selectProcessedCategoriesListsById = createSelector(
  selectRawCategoriesListsById,
  selectAppLanguage,
  (categoriesList, locale) =>
    getProcessedCategoriesLists(categoriesList, locale),
);

export const selectCategoriesList = (categoryId: string) =>
  createSelector(selectProcessedCategoriesListsById, categoriesLists =>
    prepareCategoriesListData(categoryId, categoriesLists),
  );
