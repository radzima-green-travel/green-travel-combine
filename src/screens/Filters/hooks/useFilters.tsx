import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useLayoutEffect, useMemo, useRef} from 'react';

import {
  selectTransformedGoogleRatings,
  selectFiltersRegions,
  selectActiveFilters,
  selectFiltersTotal,
  selectTransformedAggregationsWithNumberOfItems,
  selectFiltersCategories,
  selectAreAllActiveFiltersUnset,
  selectIsFiltersInitialDataLoaded,
  selectUserAuthorized,
} from 'core/selectors';
import {useIsFocused} from '@react-navigation/native';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
} from 'core/hooks';
import {
  getFiltersDataRequest,
  setActiveFilter,
  clearFilters as clearFiltersAction,
  requestUserLocation,
  initActiveFilters,
} from 'core/actions';
import {useSnackbar} from 'components/atoms';
import {isString, keys, pickBy} from 'lodash';
import {RequestError} from 'core/errors';
import {useFiltersAnalytics} from './useFiltersAnalytics';
import {
  CategoryFilterItem,
  RouteQueryParams,
  SearchFilters,
  SearchOptions,
  SpotItem,
} from 'core/types';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {base64} from 'core/helpers/encodingUtils';
import {serializeRouteParams} from 'core/helpers/routerUtils';
import {navigationCallback} from 'core/actions/navigation';

export const useFilters = () => {
  const dispatch = useDispatch();
  const {show, ...snackBarProps} = useSnackbar();
  const router = useRouter();
  const params = useLocalSearchParams<RouteQueryParams.Filter>();

  const {initialFilters, searchOptions} = useMemo(
    () => ({
      initialFilters:
        base64(params.initialFilters).toMaybeObject<SearchFilters>() ??
        undefined,
      searchOptions:
        base64(params.searchOptions).toMaybeObject<SearchOptions>() ??
        undefined,
    }),
    [params.initialFilters, params.searchOptions],
  );

  const initialQuery = params.initialQuery;

  const isAuthorized = useSelector(selectUserAuthorized);
  const caregoriesData = useSelector(selectFiltersCategories);
  const googleRatings = useSelector(selectTransformedGoogleRatings);
  const regionsList = useSelector(selectFiltersRegions);
  const isFiltersInitialDataLoaded = useSelector(
    selectIsFiltersInitialDataLoaded,
  );

  const activeFilters = useSelector(selectActiveFilters);
  const total = useSelector(selectFiltersTotal);
  const emptyActiveFilters = useSelector(selectAreAllActiveFiltersUnset);
  const {
    settlementsWithNumberOfItems,
    categoriesWithNumberOfItems,
    regionsWithNumberOfItems,
  } = useSelector(selectTransformedAggregationsWithNumberOfItems);
  const {
    sendFiltersCategorySelectEvent,
    sendFiltersRegionSelectEvent,
    sendFilterDistanceEvent,
    sendFilterDistanceSetEvent,
    sendFilterRatingSelectEvent,
    sendFilterHideVisitedEvent,
    sendFilterClearEvent,
    sendFilterApplyEvent,
    sendFiltersViewEvent,
    getAppliedFiltersAnalyticsData,
  } = useFiltersAnalytics();

  useEffect(() => {
    sendFiltersViewEvent();
  }, [sendFiltersViewEvent]);

  const {loading: filtersDataLoading} = useRequestLoading(
    getFiltersDataRequest,
  );

  useLayoutEffect(() => {
    if (initialFilters) {
      dispatch(initActiveFilters({...initialFilters}));
    }
  }, [initialFilters, dispatch]);

  const getFiltersData = useCallback(() => {
    dispatch(
      getFiltersDataRequest({
        query: initialQuery,
        filters: activeFilters,
        options: searchOptions,
      }),
    );
  }, [dispatch, initialQuery, activeFilters, searchOptions]);

  const updateRatings = useCallback(
    (newRating: string) => {
      dispatch(
        setActiveFilter({
          name: 'googleRating',
          value: newRating === 'Any' ? '' : newRating,
        }),
      );
      sendFilterRatingSelectEvent(newRating);
    },
    [dispatch, sendFilterRatingSelectEvent],
  );

  const chooseCategory = useCallback(
    (category: CategoryFilterItem) => {
      dispatch(
        setActiveFilter({
          name: 'categories',
          value: category.id,
        }),
      );

      sendFiltersCategorySelectEvent(category);
    },
    [dispatch, sendFiltersCategorySelectEvent],
  );

  const chooseRegion = useCallback(
    (region: SpotItem) => {
      dispatch(
        setActiveFilter({
          name: 'regions',
          value: region.id,
        }),
      );

      sendFiltersRegionSelectEvent(region);
    },
    [dispatch, sendFiltersRegionSelectEvent],
  );

  const updateDistanceIsOn = useCallback(
    (isOn: boolean) => {
      dispatch(
        setActiveFilter({
          name: 'distance',
          isOn: isOn,
        }),
      );
      sendFilterDistanceEvent(isOn);
    },
    [dispatch, sendFilterDistanceEvent],
  );

  const updateExcludeVisitedFilter = useCallback(
    (isOn: boolean) => {
      dispatch(
        setActiveFilter({
          name: 'excludeVisited',
          value: isOn,
        }),
      );
      sendFilterHideVisitedEvent(isOn);
    },
    [dispatch, sendFilterHideVisitedEvent],
  );

  const onExcludeVisitedPress = useCallback(
    (isOn: boolean) => {
      if (isOn && !isAuthorized) {
        router.navigate('/auth-method-selection');
      } else {
        updateExcludeVisitedFilter(isOn);
      }
    },
    [isAuthorized, router, updateExcludeVisitedFilter],
  );

  useOnRequestSuccess(navigationCallback, contextName => {
    if (contextName === 'auth') {
      updateExcludeVisitedFilter(true);
    }
  });

  useOnRequestError(
    requestUserLocation,
    'filters',
    errorLabel => {
      if (
        (errorLabel.originalError as RequestError).error_code !==
        'ERROR_LOCATION_PERMISSION_CANCELED'
      ) {
        show({
          title: errorLabel.text,
          type: 'error',
        });
      }
    },
    false,
  );

  const updateDistance = useCallback(
    (distance: number) => {
      dispatch(
        setActiveFilter({
          name: 'distance',
          value: distance,
        }),
      );
      sendFilterDistanceSetEvent(distance);
    },
    [dispatch, sendFilterDistanceSetEvent],
  );

  const clearFilters = useCallback(() => {
    dispatch(clearFiltersAction());
  }, [dispatch]);

  const clearFiltersPress = useCallback(() => {
    clearFilters();
    sendFilterClearEvent();
  }, [clearFilters, sendFilterClearEvent]);

  const navigateToSettlements = useCallback(() => {
    router.navigate({
      pathname: '/settlements',
      params: serializeRouteParams({
        initialSelectedSettlements: activeFilters.municipalities,
        regionsToInclude: keys(pickBy(settlementsWithNumberOfItems, Boolean)),
        regionsSelectedNames: getAppliedFiltersAnalyticsData().regions_selected,
      }),
    });
  }, [
    router,
    activeFilters.municipalities,
    settlementsWithNumberOfItems,
    getAppliedFiltersAnalyticsData,
  ]);

  const isFirstRender = useRef(true);

  const isNeedToFetchData = (() => {
    if (isFirstRender.current) {
      return (
        !initialFilters &&
        (!isFiltersInitialDataLoaded || isString(initialQuery))
      );
    }
    return true;
  })();

  useEffect(() => {
    if (isNeedToFetchData) {
      getFiltersData();
    }
    isFirstRender.current = false;
  }, [dispatch, getFiltersData, isNeedToFetchData]);

  const isFocused = useIsFocused();

  const {errorTexts} = useOnRequestError(
    getFiltersDataRequest,
    'filters',
    errorLabel => {
      if (isFocused && isFiltersInitialDataLoaded) {
        show({
          title: errorLabel.text,
          type: 'error',
        });
      }
    },
    false,
  );

  const getIsRegionDisabled = useCallback(
    (regionID: string) => {
      return regionsWithNumberOfItems[regionID] === 0;
    },
    [regionsWithNumberOfItems],
  );

  const getIsCategoryDisabled = useCallback(
    (categoryId: string) => {
      return categoriesWithNumberOfItems[categoryId] === 0;
    },
    [categoriesWithNumberOfItems],
  );

  const applyFilters = useCallback(() => {
    router.navigate(`/search?filtersToApply=${base64().from(activeFilters)}`);
    sendFilterApplyEvent();
  }, [activeFilters, router, sendFilterApplyEvent]);

  return {
    caregoriesData,
    googleRatings,
    getFiltersData,
    chooseRegion,
    clearFilters,
    navigateToSettlements,
    fullScreenLoading: isFiltersInitialDataLoaded ? false : filtersDataLoading,
    errorTexts: isFiltersInitialDataLoaded ? null : errorTexts,
    filtersDataLoading,
    emptyActiveFilters,
    regions: regionsList,
    activeFilters,
    updateRatings,
    chooseCategory,
    updateDistanceIsOn,
    updateDistance,
    total,
    snackBarProps,
    getIsRegionDisabled,
    getIsCategoryDisabled,
    applyFilters,
    onExcludeVisitedPress,
    clearFiltersPress,
  };
};
