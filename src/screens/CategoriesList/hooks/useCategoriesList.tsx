import {useCallback, useEffect, useLayoutEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {
  useCategoryListAnalytics,
  useListPagination,
  useOnRequestError,
  useRequestLoading,
} from 'core/hooks';
import {CardItem, RouteQueryParams} from 'core/types';
import {
  getCategoriesListInitialDataRequest,
  getCategoriesListNextDataRequest,
} from 'core/actions';
import {selectCategoriesList} from 'selectors';
import {useRouter, useNavigation, useLocalSearchParams} from 'expo-router';

export const useCategoriesList = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const {setOptions} = useNavigation();

  const {categoryId, title} =
    useLocalSearchParams<RouteQueryParams.CategoryList>();

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
      router.navigate({
        pathname: '/object-list',
        params: {
          categoryId: item.id,
          title: item.name,
        },
      });
      sendSelectCardEvent(item.name, title);
    },
    [router, sendSelectCardEvent, title],
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
