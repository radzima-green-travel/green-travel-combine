import { call, put, select } from 'redux-saga/effects';
import {
  CategoryAggregationsByObjectsDTO,
  CategoriesResponseDTO,
  CategoriesListQueryParams,
} from 'core/types';
import {
  getCategoriesListInitialDataRequest,
  getCategoriesListNextDataRequest,
} from 'core/actions';
import { RequestError } from 'core/errors';
import { selectCategoriesList } from 'selectors';
import { getCategoriesData } from '../fetchRequests';
import { filter } from 'lodash';

export function* getCategoriesListDataSaga({
  meta: { failureAction, successAction },
  payload,
}: ReturnType<
  | typeof getCategoriesListInitialDataRequest
  | typeof getCategoriesListNextDataRequest
>) {
  try {
    const { nextToken: prevNextToken } = yield select(
      selectCategoriesList(payload),
    );

    const params: CategoriesListQueryParams = {
      limit: 10,
      nextToken: prevNextToken,
      filter: {
        parent: {
          eq: payload,
        },
      },
    };

    const {
      categoriesData: { items, nextToken, total },
      categoriesWithObjects,
    }: {
      categoriesData: CategoriesResponseDTO;
      categoriesWithObjects: CategoryAggregationsByObjectsDTO[];
    } = yield call(getCategoriesData, { payload: params });

    const filteredData = filter(items, item =>
      categoriesWithObjects.some(category => category.key === item.id),
    );

    yield put(
      successAction({
        id: payload,
        data: filteredData,
        requestedItemsCount: items.length,
        nextToken,
        total,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
