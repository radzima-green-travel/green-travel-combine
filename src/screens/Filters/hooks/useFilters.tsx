import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';

import {
  selectTransformedGoogleRatings,
  selectFiltersRegions,
  selectActiveFilters,
  selectFiltersTotal,
  selectTransformedAggregationsWithNumberOfItems,
  selectFiltersCategories,
} from 'core/selectors';
import {
  useOnRequestError,
  useRequestLoading,
  useUpdateEffect,
} from 'core/hooks';
import {
  getFiltersDataRequest,
  getInitialFiltersRequest,
  setActiveFilter,
  clearFilters as clearFiltersAction,
} from 'core/actions';
import {useSnackbar} from 'components/atoms';

export const useFilters = () => {
  const dispatch = useDispatch();
  const {show, ...snackBarProps} = useSnackbar();

  const caregoriesData = useSelector(selectFiltersCategories);
  const googleRatings = useSelector(selectTransformedGoogleRatings);
  const regionsList = useSelector(selectFiltersRegions);
  const activeFilters = useSelector(selectActiveFilters);
  const total = useSelector(selectFiltersTotal);
  const {categoriesWithNumberOfItems, regionsWithNumberOfItems} = useSelector(
    selectTransformedAggregationsWithNumberOfItems,
  );

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

  const emptyActiveFilters = !Object.values(activeFilters).find(
    value => value?.length,
  );

  const getFiltersInitialData = useCallback(() => {
    dispatch(getInitialFiltersRequest());
  }, [dispatch]);

  const getFiltersData = useCallback(() => {
    dispatch(
      getFiltersDataRequest({
        filter: activeFilters,
      }),
    );
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

  const clearFilters = useCallback(() => {
    dispatch(clearFiltersAction());
  }, [dispatch]);

  useUpdateEffect(() => {
    getFiltersData();
  }, [dispatch, getFiltersData]);

  useEffect(() => {
    getFiltersInitialData();
  }, [getFiltersInitialData]);

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
    getFiltersInitialData,
    chooseRegion,
    clearFilters,
    fullScreenLoading: loadingInitialFilters,
    errorTexts: errorTextsInitialFilters,
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
