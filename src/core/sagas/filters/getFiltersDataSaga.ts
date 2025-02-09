import {all, call, put, select} from 'redux-saga/effects';
import {
  CategoryFilterItemDTO,
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
} from 'core/types';
import {RequestError} from 'core/errors';
import {graphQLAPI} from 'api/graphql';
import {getFiltersDataRequest, setActiveFilter} from 'core/actions';
import {transformActiveFiltersToFilterParam} from 'core/transformators/filters';
import {getInitialFiltersSaga} from './getInitialFiltersSaga';
import {selectAppLanguage, selectUserAuthorizedData} from 'core/selectors';
import {transformSearchOptionsToFieldsToSearch} from 'core/transformators/search';
import {locationService} from 'services/LocationService';
import {DEFAULT_LOCALE} from 'core/constants';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload: {filters, query, options},
}: ReturnType<typeof getFiltersDataRequest>) {
  try {
    const userData: ReturnType<typeof selectUserAuthorizedData> = yield select(
      selectUserAuthorizedData,
    );

    const {isOn, location} = filters.distance;

    if (isOn && !location) {
      const permissionGranted = yield call([
        locationService,
        locationService.checkLocationPermission,
      ]);

      if (!permissionGranted) {
        yield put(setActiveFilter({name: 'distance', isOn: false}));
      } else {
        const loctaionCoords = yield call([
          locationService,
          locationService.getLowAccuracyCurrentPosition,
        ]);

        yield put(
          setActiveFilter({
            name: 'distance',
            isOn: true,
            location: loctaionCoords,
          }),
        );
      }

      return;
    }

    const appLocale: ReturnType<typeof selectAppLanguage> =
      yield select(selectAppLanguage);
    const [filtersResult, filtersInitialData]: [
      ObjectFiltersDataDTO,
      {
        regionsList: RegionsListResponseDTO;
        categoriesList: CategoryFilterItemDTO[];
      },
    ] = yield all([
      call([graphQLAPI, graphQLAPI.getFilterObjects], {
        ...(options ? transformSearchOptionsToFieldsToSearch(options) : {}),
        ...transformActiveFiltersToFilterParam({
          filters,

          userId: userData?.sub,
        }),
        query,
        locale:
          !appLocale || appLocale === DEFAULT_LOCALE ? undefined : appLocale,
      }),
      call(getInitialFiltersSaga),
    ]);

    yield put(
      successAction({
        filtersData: filtersResult,
        regionsList: filtersInitialData.regionsList,
        categoriesList: filtersInitialData.categoriesList,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
