import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';

import {selectCategories, selectFiltersRegionsList} from 'core/selectors';

import {useOnRequestError, useRequestLoading} from 'react-redux-help-kit';
import {getFiltersDataRequest, refreshFiltersDataRequest} from 'core/actions';

export const useFilters = () => {
  const dispatch = useDispatch();

  const caregoriesData = useSelector(selectCategories);
  const regionsData = useSelector(selectFiltersRegionsList);
  const ratingGoogle = ['Any', '3,5+', '4+', '4,5+'];

  const {loading} = useRequestLoading(getFiltersDataRequest);

  const getFiltersData = useCallback(() => {
    dispatch(getFiltersDataRequest());
  }, [dispatch]);

  const refreshFiltersData = useCallback(() => {
    dispatch(refreshFiltersDataRequest());
  }, [dispatch]);

  useOnRequestError(getFiltersDataRequest, () => {});

  return {
    caregoriesData,
    ratingGoogle,
    getFiltersData,
    refreshFiltersData,
    loading,
    errorTexts: null,
    regions: regionsData,
  };
};
