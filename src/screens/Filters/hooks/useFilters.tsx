import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';

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
} from 'core/selectors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProps} from '../types';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
  useUpdateEffect,
} from 'core/hooks';
import {
  getFiltersDataRequest,
  getInitialFiltersRequest,
  setActiveFilter,
  clearFilters as clearFiltersAction,
  requestUserLocation,
} from 'core/actions';
import {useSnackbar} from 'components/atoms';
import {keys, pickBy} from 'lodash';

export const useFilters = () => {
  const dispatch = useDispatch();
  const {show, ...snackBarProps} = useSnackbar();
  const navigation = useNavigation<HomeScreenNavigationProps>();

  const caregoriesData = useSelector(selectFiltersCategories);
  const googleRatings = useSelector(selectTransformedGoogleRatings);
  const regionsList = useSelector(selectFiltersRegions);
  const activeFilters = useSelector(selectActiveFilters);
  const total = useSelector(selectFiltersTotal);
  const emptyActiveFilters = useSelector(selectAreAllActiveFiltersUnset);
  const {settlementsWithNumberOfItems, regionsWithNumberOfItems} = useSelector(
    selectTransformedAggregationsWithNumberOfItems,
  );
  const distanceFilterLocation = useSelector(selectDistanceFilterLocation);
  const activeFiltersLocation = useSelector(selectActiveFiltersLocation);

  const {loading: loadingInitialFilters} = useRequestLoading(
    getInitialFiltersRequest,
  );
  const {errorTexts: errorTextsInitialFilters} = useOnRequestError(
    getInitialFiltersRequest,
    'filters',
  );

  const {loading: filtersDataLoading} = useRequestLoading(
    getFiltersDataRequest,
  );

  const getFiltersInitialData = useCallback(() => {
    dispatch(getInitialFiltersRequest());
  }, [dispatch]);

  const getFiltersData = useCallback(() => {
    dispatch(getFiltersDataRequest(activeFilters));
  }, [dispatch, activeFilters]);

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

  useUpdateEffect(() => {
    getFiltersData();
  }, [dispatch, getFiltersData]);

  useEffect(() => {
    getFiltersInitialData();
  }, [getFiltersInitialData]);

  const isFocused = useIsFocused();

  useOnRequestError(
    getFiltersDataRequest,
    'filters',
    errorLabel => {
      if (isFocused) {
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

  return {
    caregoriesData,
    googleRatings,
    getFiltersData,
    getFiltersInitialData,
    chooseRegion,
    clearFilters,
    navigateToSettlements,
    fullScreenLoading: loadingInitialFilters,
    errorTexts: errorTextsInitialFilters,
    filtersDataLoading,
    emptyActiveFilters,
    regions: regionsList,
    activeRating: activeFilters.googleRating,
    activeRegions: activeFilters.regions,
    activeCategories: activeFilters.categories,
    activeSettlements: activeFilters.municipalities,
    activeDistance: activeFilters.distance,
    updateRatings,
    chooseCategory,
    updateDistanceIsOn,
    updateDistance,
    total,
    snackBarProps,
    getIsRegionDisabled,
  };
};
