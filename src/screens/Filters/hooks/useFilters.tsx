import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';

import {
  selectHomePageCategoriesList,
  selectTransformedGoogleRatings,
  selectTransformedRegions,
  selectActiveFilters,
  selectFiltersTotal,
  selectTransformedAggregationsWithNumberOfItems,
} from 'core/selectors';

import {useRequestLoading} from 'react-redux-help-kit';
import {
  getFiltersDataRequest,
  getRegionsList,
  setActiveFilter,
  clearFilters as clearFiltersAction,
} from 'core/actions';

export const useFilters = () => {
  const dispatch = useDispatch();

  const caregoriesData = useSelector(selectHomePageCategoriesList);
  const googleRatings = useSelector(selectTransformedGoogleRatings);
  const regionsList = useSelector(selectTransformedRegions);
  const activeFilters = useSelector(selectActiveFilters);
  const total = useSelector(selectFiltersTotal);
  const {categoriesWithNumberOfItems, regionsWithNumberOfItems} = useSelector(
    selectTransformedAggregationsWithNumberOfItems,
  );

  const {loading: loadingRegions} = useRequestLoading(getRegionsList);
  const {loading: liltersDataLoading} = useRequestLoading(
    getFiltersDataRequest,
  );

  const emptyActiveFilters = !Object.values(activeFilters).find(
    value => value.length,
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

  useEffect(() => {
    getFiltersData();
  }, [dispatch, getFiltersData]);

  return {
    caregoriesData,
    googleRatings,
    getFiltersData,
    chooseRegion,
    clearFilters,
    fullScreenLoading: loadingRegions,
    liltersDataLoading,
    emptyActiveFilters,
    errorTexts: null,
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
