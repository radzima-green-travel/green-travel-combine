import {
  CategoriesAggregationsByObjectsResponseDTO,
  FiltersCategoriesResponseDTO,
  RegionsListResponseDTO,
  ObjectFiltersDataDTO,
} from 'core/types';
import { all, call, select } from 'redux-saga/effects';
import { graphQLAPI } from 'api/graphql';
import { getCategoriesWithObjects } from 'core/transformators/homePage';
import { filter } from 'lodash';
import { selectFiltersCategoriesList, selectRegions } from 'core/selectors';

export function* getInitialFiltersSaga() {
  const currentRegionsList = yield select(selectRegions);
  const currentCategoriesList = yield select(selectFiltersCategoriesList);

  if (currentRegionsList.length && currentCategoriesList.length) {
    return {
      categoriesList: currentCategoriesList,
      regionsList: currentRegionsList,
    };
  }

  const [filtersCategoriesResponse, regionsList, aggregations]: [
    FiltersCategoriesResponseDTO,
    RegionsListResponseDTO,
    CategoriesAggregationsByObjectsResponseDTO,
    ObjectFiltersDataDTO,
  ] = yield all([
    call([graphQLAPI, graphQLAPI.getFiltersCategories]),
    call([graphQLAPI, graphQLAPI.getRegions]),
    call([graphQLAPI, graphQLAPI.getCategoriesAggregationsByObjects]),
  ]);

  const categoriesWithObjects: ReturnType<typeof getCategoriesWithObjects> =
    yield call(getCategoriesWithObjects, aggregations);

  const categoriesList = filter(filtersCategoriesResponse.items, item =>
    categoriesWithObjects.some(category => category.key === item.id),
  );

  return {
    categoriesList,
    regionsList,
  };
}
