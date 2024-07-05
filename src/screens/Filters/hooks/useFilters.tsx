import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';

import {selectCategories, selectFiltersState} from 'core/selectors';

import {useOnRequestError, useRequestLoading} from 'react-redux-help-kit';
import {
  getFiltersDataRequest,
  refreshFiltersDataRequest,
  changeRatingGoogle,
} from 'core/actions';

export const useFilters = () => {
  const dispatch = useDispatch();

  const caregoriesData = useSelector(selectCategories);
  const {ratingGoogle, regionsList, activeRating} =
    useSelector(selectFiltersState);

  const {loading} = useRequestLoading(getFiltersDataRequest);

  const getFiltersData = useCallback(() => {
    dispatch(getFiltersDataRequest());
  }, [dispatch]);

  const refreshFiltersData = useCallback(() => {
    dispatch(refreshFiltersDataRequest());
  }, [dispatch]);

  const updateRatings = useCallback(
    (newRatings: string) => {
      dispatch(changeRatingGoogle(newRatings));
    },
    [dispatch],
  );

  useEffect(() => {
    getFiltersData();
  }, [getFiltersData]);

  useOnRequestError(getFiltersDataRequest, () => {});

  return {
    caregoriesData,
    ratingGoogle,
    getFiltersData,
    refreshFiltersData,
    loading,
    errorTexts: null,
    regions: regionsList,
    activeRating,
    updateRatings,
  };
};
