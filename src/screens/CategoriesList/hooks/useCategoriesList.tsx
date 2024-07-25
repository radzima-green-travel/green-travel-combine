import {useCallback, useEffect, useLayoutEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useCategoryListAnalytics,
  useListPagination,
  useOnRequestError,
  useRequestLoading,
} from 'core/hooks';
import {CardItem} from 'core/types';
import {
  getCategoriesListInitialDataRequest,
  getCategoriesListNextDataRequest,
} from 'core/actions';
import {selectCategoriesList} from 'selectors';
import {
  CategoriesListScreenNavigationProps,
  CategoriesListScreenRouteProps,
} from '../types';

export const useCategoriesList = () => {
  const dispatch = useDispatch();

  const {navigate, setOptions} =
    useNavigation<CategoriesListScreenNavigationProps>();
  const {
    params: {categoryId, title},
  } = useRoute<CategoriesListScreenRouteProps>();

  const {
    data: listData,
    total,
    requestedItemsCount,
  } = useSelector(selectCategoriesList(categoryId));

  const {loading: initialDataLoading} = useRequestLoading(
    getCategoriesListInitialDataRequest,
  );
  const {loading: nextDataLoading} = useRequestLoading(
    getCategoriesListNextDataRequest,
  );
  const {errorTexts} = useOnRequestError(
    getCategoriesListInitialDataRequest,
    '',
  );

  const {sendSelectCardEvent} = useCategoryListAnalytics();

  const fetchListInitialData = useCallback(() => {
    dispatch(getCategoriesListInitialDataRequest(categoryId));
  }, [dispatch, categoryId]);

  const fetchListNextData = useCallback(() => {
    dispatch(getCategoriesListNextDataRequest(categoryId));
  }, [dispatch, categoryId]);

  const navigateToObjectDetails = useCallback(
    (item: CardItem) => {
      navigate('ObjectsList', {categoryId: item.id, title: item.name});
      sendSelectCardEvent(item.name, title);
    },
    [navigate, sendSelectCardEvent, title],
  );

  const paginationProps = useListPagination({
    isLoading: nextDataLoading,
    loadMore: fetchListNextData,
    hasMoreToLoad: requestedItemsCount < total,
  });

  useEffect(() => {
    if (!listData.length) {
      fetchListInitialData();
    }
  }, [listData.length, fetchListInitialData]);

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  return {
    navigateToObjectDetails,
    fetchListInitialData,
    initialDataLoading,
    paginationProps,
    errorTexts,
    listData,
  };
};
