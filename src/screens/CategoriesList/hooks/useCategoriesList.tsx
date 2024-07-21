import {useCallback, useLayoutEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  useCategoryListAnalytics,
  useListPagination,
  useOnRequestError,
  useRequestLoading,
} from 'core/hooks';
import {CardItem} from 'core/types';
import {getCategoriesListDataRequest} from 'core/actions';
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

  const {data: listData, total} = useSelector(selectCategoriesList(categoryId));

  const {loading} = useRequestLoading(getCategoriesListDataRequest);
  const {errorTexts} = useOnRequestError(getCategoriesListDataRequest, '');

  const {sendSelectCardEvent} = useCategoryListAnalytics();

  const fetchListData = useCallback(() => {
    dispatch(getCategoriesListDataRequest(categoryId));
  }, [dispatch, categoryId]);

  const navigateToObjectDetails = useCallback(
    (item: CardItem) => {
      navigate('ObjectsList', {categoryId: item.id, title: item.name});
      sendSelectCardEvent(item.name, title);
    },
    [navigate, sendSelectCardEvent, title],
  );

  const suspenseViewLoading = !listData.length && loading;
  const suspenseViewError =
    !listData.length && !!errorTexts ? errorTexts : null;

  const paginationProps = useListPagination({
    isLoading: loading,
    loadMore: fetchListData,
    hasMoreToLoad: listData.length < total,
  });

  useFocusEffect(
    useCallback(() => {
      if (!listData.length) {
        fetchListData();
      }
    }, [listData.length, fetchListData]),
  );

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  return {
    navigateToObjectDetails,
    suspenseViewLoading,
    suspenseViewError,
    paginationProps,
    fetchListData,
    listData,
  };
};
