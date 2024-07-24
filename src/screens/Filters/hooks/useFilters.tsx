import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';

import {
  selectHomePageCategoriesList,
  selectTransformedFilters,
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
  const {
    googleRatings,
    regionsList,
    activeFilters,
    total,
    countOfItemsForCategories,
    countOfItemsForRegions,
  } = useSelector(selectTransformedFilters);

  const {loading} = useRequestLoading(getRegionsList);

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
          value: newRating === 'Any' ? null : newRating,
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
    dispatch(getRegionsList());
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
    loading,
    errorTexts: null,
    regions: regionsList,
    activeRating: activeFilters.googleRating,
    activeRegions: activeFilters.regions,
    activeCategories: activeFilters.categories,
    updateRatings,
    chooseCategory,
    total,
    countOfItemsForCategories,
    countOfItemsForRegions,
  };
};
