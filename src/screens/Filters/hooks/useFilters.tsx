import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useLayoutEffect, useRef} from 'react';

import {
  selectTransformedGoogleRatings,
  selectFiltersRegions,
  selectActiveFilters,
  selectFiltersTotal,
  selectTransformedAggregationsWithNumberOfItems,
  selectFiltersCategories,
  selectAreAllActiveFiltersUnset,
  selectDistanceFilterLocation,
  selectActiveFiltersLocation,
  selectIsFiltersInitialDataLoaded,
  selectUserAuthorized,
} from 'core/selectors';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {FiltersNavigationProps, FiltersRouteProps} from '../types';
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

export const useFilters = () => {
  const dispatch = useDispatch();
  const {show, ...snackBarProps} = useSnackbar();
  const navigation = useNavigation<FiltersNavigationProps>();
  const {params} = useRoute<FiltersRouteProps>();
  const {initialFilters, initialQuery} = params || {};
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
  const {settlementsWithNumberOfItems, regionsWithNumberOfItems} = useSelector(
    selectTransformedAggregationsWithNumberOfItems,
  );
  const distanceFilterLocation = useSelector(selectDistanceFilterLocation);
  const activeFiltersLocation = useSelector(selectActiveFiltersLocation);

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
      }),
    );
  }, [dispatch, initialQuery, activeFilters]);

  const updateRatings = useCallback(
    (newRating: string) => {
      dispatch(
        setActiveFilter({
          name: 'googleRating',
          value: newRating === 'Any' ? '' : newRating,
        }),
      );
    },
    [dispatch],
  );

  const chooseCategory = useCallback(
    (categoryID: string) => {
      dispatch(
        setActiveFilter({
          name: 'categories',
          value: categoryID,
        }),
      );
    },
    [dispatch],
  );

  const chooseRegion = useCallback(
    (regionID: string) => {
      dispatch(
        setActiveFilter({
          name: 'regions',
          value: regionID,
        }),
      );
    },
    [dispatch],
  );

  const updateDistanceIsOn = useCallback(
    (isOn: boolean) => {
      if (isOn && !activeFiltersLocation) {
        dispatch(requestUserLocation());
      } else {
        dispatch(
          setActiveFilter({
            name: 'distance',
            isOn: isOn,
          }),
        );
      }
    },
    [dispatch, activeFiltersLocation],
  );

  const updateExcludeVisitedFilter = useCallback(
    (isOn: boolean) => {
      dispatch(
        setActiveFilter({
          name: 'excludeVisited',
          value: isOn,
        }),
      );
    },
    [dispatch],
  );

  const onExcludeVisitedPress = useCallback(
    (isOn: boolean) => {
      if (isOn && !isAuthorized) {
        navigation.navigate('AuthNavigator', {
          screen: 'AuthMethodSelection',
          onSuccessSignIn: () => updateExcludeVisitedFilter(isOn),
        });
      } else {
        updateExcludeVisitedFilter(isOn);
      }
    },
    [isAuthorized, navigation, updateExcludeVisitedFilter],
  );

  useOnRequestSuccess(requestUserLocation, () => {
    dispatch(
      setActiveFilter({
        name: 'distance',
        isOn: true,
        location: distanceFilterLocation,
      }),
    );
  });

  useOnRequestError(
    requestUserLocation,
    'filters',
    errorLabel => {
      show({
        title: errorLabel.text,
        type: 'error',
      });
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
    },
    [dispatch],
  );

  const clearFilters = useCallback(() => {
    dispatch(clearFiltersAction());
  }, [dispatch]);

  const navigateToSettlements = useCallback(() => {
    navigation.navigate('Settlements', {
      initialSelectedSettlements: activeFilters.municipalities,
      regionsToInclude: keys(pickBy(settlementsWithNumberOfItems, Boolean)),
    });
  }, [activeFilters.municipalities, settlementsWithNumberOfItems, navigation]);

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
      return (
        Boolean(activeFilters.municipalities.length) &&
        regionsWithNumberOfItems[regionID] === 0
      );
    },
    [activeFilters.municipalities.length, regionsWithNumberOfItems],
  );

  const applyFilters = useCallback(() => {
    navigation.navigate('HomeNavigator', {
      screen: 'Search',
      params: {
        filtersToApply: activeFilters,
      },
    });
  }, [activeFilters, navigation]);

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
    applyFilters,
    onExcludeVisitedPress,
  };
};
