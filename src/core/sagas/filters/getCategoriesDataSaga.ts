import {CategoryShortDTO, ObjectShortDTO} from 'core/types';
import {call, put} from 'redux-saga/effects';
import {RequestError} from 'core/errors';
import {fetchCategoriesData} from '../fetchRequests/fetchCategoriesData';
import {getFiltersCategories} from 'core/actions';

export function* getFiltersCategorieDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<typeof getFiltersCategories>) {
  try {
    const {
      categoriesListItems,
      objectsByCategory,
    }: {
      categoriesListItems: Array<CategoryShortDTO>;
      objectsByCategory: Record<string, ObjectShortDTO[]>;
    } = yield call(fetchCategoriesData);

    yield put(
      successAction({
        categoriesList: categoriesListItems,
        objectsByCategory: objectsByCategory,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
