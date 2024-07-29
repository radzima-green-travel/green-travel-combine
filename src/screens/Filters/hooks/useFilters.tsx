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
import {useOnRequestError, useRequestLoading} from 'core/hooks';
import {
  getFiltersDataRequest,
  getRegionsList,
  getFiltersCategories,
  setActiveFilter,
  clearFilters as clearFiltersAction,
} from 'core/actions';
import {useSnackbar} from 'components/atoms';

export const useFilters = () => {
  const dispatch = useDispatch();
  const {show, ...snackBarProps} = useSnackbar();

  const caregoriesData = useSelector(selectTransformedFiltersCategories);
  const googleRatings = useSelector(selectTransformedGoogleRatings);
  const regionsList = useSelector(selectTransformedRegions);
  const activeFilters = useSelector(selectActiveFilters);
  const total = useSelector(selectFiltersTotal);
  const {categoriesWithNumberOfItems, regionsWithNumberOfItems} = useSelector(
    selectTransformedAggregationsWithNumberOfItems,
  );

  const {loading: loadingRegions} = useRequestLoading(getRegionsList);
  const {errorTexts: errorTextsRegions} = useOnRequestError(
    getRegionsList,
    'filters',
  );
  const {loading: loadingCategories} = useRequestLoading(getFiltersCategories);
  const {errorTexts: errorTextsCategories} = useOnRequestError(
    getFiltersCategories,
    'filters',
  );

  const {loading: filtersDataLoading} = useRequestLoading(
    getFiltersDataRequest,
  );

  const fullScreenLoading = loadingRegions || loadingCategories;
  const fullScreenError = errorTextsRegions || errorTextsCategories;

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

  useEffect(() => {
    getFiltersData();
  }, [dispatch, getFiltersData]);

  useEffect(() => {
    if (!regionsList.length) {
      dispatch(getRegionsList());
    }
    if (!caregoriesData.length) {
      dispatch(getFiltersCategories());
    }
  }, [dispatch, regionsList, caregoriesData]);

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
    chooseRegion,
    clearFilters,
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
