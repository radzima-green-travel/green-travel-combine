import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';

import {
  selectFiltersCategories,
  selectTransformedGoogleRatings,
  selectTransformedRegions,
  selectActiveFilters,
  selectFiltersTotal,
  selectTransformedAggregationsWithNumberOfItems,
} from 'core/selectors';
import {useRequestLoading, useUpdateEffect} from 'react-redux-help-kit';
import {
  getFiltersDataRequest,
  getFiltersInitialDataRequest,
  setActiveFilter,
  clearFilters as clearFiltersAction,
} from 'core/actions';
import {useOnRequestError} from 'core/hooks';

export const useFilters = () => {
  const dispatch = useDispatch();

  const caregoriesData = useSelector(selectFiltersCategories);
  const googleRatings = useSelector(selectTransformedGoogleRatings);
  const regionsList = useSelector(selectTransformedRegions);
  const activeFilters = useSelector(selectActiveFilters);
  const total = useSelector(selectFiltersTotal);
  const {categoriesWithNumberOfItems, regionsWithNumberOfItems} = useSelector(
    selectTransformedAggregationsWithNumberOfItems,
  );

  const {loading: fullScreenLoading} = useRequestLoading(
    getFiltersInitialDataRequest,
  );

  const {errorTexts} = useOnRequestError(getFiltersInitialDataRequest, '');

  const {loading: filtersDataLoading} = useRequestLoading(
    getFiltersDataRequest,
  );

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

  const getFiltersInitialData = useCallback(() => {
    dispatch(getFiltersInitialDataRequest());
  }, [dispatch]);

  useUpdateEffect(() => {
    getFiltersData();
  }, [dispatch, getFiltersData]);

  useEffect(() => {
    getFiltersInitialData();
  }, [getFiltersInitialData]);

  return {
    caregoriesData,
    googleRatings,
    getFiltersInitialData,
    chooseRegion,
    clearFilters,
    fullScreenLoading: fullScreenLoading,
    filtersDataLoading,
    emptyActiveFilters,
    errorTexts,
    regions: regionsList,
    activeRating: activeFilters.googleRating,
    activeRegions: activeFilters.regions,
    activeCategories: activeFilters.categories,
    updateRatings,
    chooseCategory,
    total,
    categoriesWithNumberOfItems,
    regionsWithNumberOfItems,
  };
};
