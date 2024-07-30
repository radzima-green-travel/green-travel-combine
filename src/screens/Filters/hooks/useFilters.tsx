import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';

import {
  selectTransformedGoogleRatings,
  selectTransformedRegions,
  selectActiveFilters,
  selectFiltersTotal,
  selectTransformedAggregationsWithNumberOfItems,
  selectTransformedFiltersCategories,
} from 'core/selectors';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProps} from '../types';
import {useOnRequestError, useRequestLoading} from 'core/hooks';
import {
  getFiltersDataRequest,
  getInitialFilters,
  setActiveFilter,
  clearFilters as clearFiltersAction,
} from 'core/actions';
import {useSnackbar} from 'components/atoms';

export const useFilters = () => {
  const dispatch = useDispatch();
  const {show, ...snackBarProps} = useSnackbar();
  const navigation = useNavigation<HomeScreenNavigationProps>();

  const caregoriesData = useSelector(selectTransformedFiltersCategories);
  const googleRatings = useSelector(selectTransformedGoogleRatings);
  const regionsList = useSelector(selectTransformedRegions);
  const activeFilters = useSelector(selectActiveFilters);
  const total = useSelector(selectFiltersTotal);
  const {categoriesWithNumberOfItems, regionsWithNumberOfItems} = useSelector(
    selectTransformedAggregationsWithNumberOfItems,
  );

  const {loading: loadingInitialFilters} = useRequestLoading(getInitialFilters);
  const {errorTexts: errorTextsInitialFilters} = useOnRequestError(
    getInitialFilters,
    'filters',
  );

  const {loading: filtersDataLoading} = useRequestLoading(
    getFiltersDataRequest,
  );

  const fullScreenLoading = loadingInitialFilters;
  const fullScreenError = errorTextsInitialFilters;

  const emptyActiveFilters = !Object.values(activeFilters).find(
    value => value?.length,
  );

  const getFiltersData = useCallback(() => {
    dispatch(
      getFiltersDataRequest({
        filter: activeFilters,
      }),
    );
  }, [dispatch, activeFilters]);

  const retryToGetInitialFiltersData = useCallback(() => {
    dispatch(getInitialFilters());
  }, [dispatch]);

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

  const clearFilters = useCallback(() => {
    dispatch(clearFiltersAction());
  }, [dispatch]);

  const navigateToSettlements = useCallback(() => {
    navigation.navigate('Settlements');
  }, [navigation]);

  useEffect(() => {
    getFiltersData();
  }, [dispatch, getFiltersData]);

  useOnRequestError(getFiltersDataRequest, 'filters', errorLabel => {
    show({
      title: errorLabel.text,
      type: 'error',
    });
  });

  return {
    caregoriesData,
    googleRatings,
    getFiltersData,
    retryToGetInitialFiltersData,
    chooseRegion,
    clearFilters,
    navigateToSettlements,
    fullScreenLoading,
    errorTexts: fullScreenError,
    filtersDataLoading,
    emptyActiveFilters,
    regions: regionsList,
    activeRating: activeFilters.googleRating,
    activeRegions: activeFilters.regions,
    activeCategories: activeFilters.categories,
    updateRatings,
    chooseCategory,
    total,
    categoriesWithNumberOfItems,
    regionsWithNumberOfItems,
    snackBarProps,
  };
};
