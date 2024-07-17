import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';

import {selectCategories, selectFilters} from 'core/selectors';

import {useOnRequestError} from 'react-redux-help-kit';
import {getFiltersDataRequest} from 'core/actions';
import {changeCategory, changeRatingGoogle} from 'core/reducers';

export const useFilters = () => {
  const dispatch = useDispatch();

  const caregoriesData = useSelector(selectCategories);
  const {googleRatings, regionsList, activeRating, total, activeCategories} =
    useSelector(selectFilters);

  const getFiltersData = useCallback(() => {
    dispatch(
      getFiltersDataRequest({
        filter: {
          googleRating: activeRating,
          categories: activeCategories,
        },
      }),
    );
  }, [dispatch, activeRating, activeCategories]);

  const updateRatings = useCallback(
    (newRating: string) => {
      dispatch(changeRatingGoogle(newRating === 'Any' ? null : newRating));
    },
    [dispatch],
  );

  const chooseCategory = useCallback(
    (category: string) => {
      dispatch(changeCategory(category));
    },
    [dispatch],
  );

  useEffect(() => {
    getFiltersData();
  }, [getFiltersData]);

  useOnRequestError(getFiltersDataRequest, () => {});

  return {
    caregoriesData,
    googleRatings,
    getFiltersData,
    loading: false,
    errorTexts: null,
    regions: regionsList,
    activeRating,
    activeCategories,
    updateRatings,
    chooseCategory,
    total,
  };
};
