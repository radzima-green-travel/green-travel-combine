import {useMemo, useCallback, useLayoutEffect} from 'react';

import {
  useListPagination,
  useObjectsListAnalytics,
  useOnRequestError,
  useRequestLoading,
} from 'core/hooks';
import {CardItem} from 'core/types';
import {debounce} from 'lodash';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  ObjectsListScreenNavigationProps,
  ObjectsListScreenRouteProps,
} from '../types';
import {useRoute} from '@react-navigation/native';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {selectObjectsList} from 'selectors';
import {getObjectsListDataRequest} from 'core/actions';

export const useObjectsList = () => {
  const dispatch = useDispatch();

  const {push, setOptions} = useNavigation<ObjectsListScreenNavigationProps>();

  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useObjectsListAnalytics();

  const navigateToObjectDetails = useCallback(
    ({id, name, analyticsMetadata}: CardItem) => {
      push('ObjectDetails', {
        objectId: id,
        analytics: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
      sendSelectCardEvent(name, analyticsMetadata.categoryName);
    },
    [push, sendSelectCardEvent],
  );

  const sendIsFavoriteChangedEvent = useCallback(
    ({name, analyticsMetadata}: CardItem, nextIsFavoriteStatus: boolean) => {
      if (nextIsFavoriteStatus) {
        sendSaveCardEvent(name, analyticsMetadata.categoryName);
      } else {
        sendUnsaveCardEvent(name, analyticsMetadata.categoryName);
      }
    },
    [sendSaveCardEvent, sendUnsaveCardEvent],
  );

  const navigateToObjectDetailsDebounced = useMemo(
    () =>
      debounce(navigateToObjectDetails, 300, {leading: true, trailing: false}),
    [navigateToObjectDetails],
  );

  const {
    params: {categoryId, title, objectsIds},
  } = useRoute<ObjectsListScreenRouteProps>();

  const listId = objectsIds?.length ? objectsIds.join(' ') : categoryId;

  const {data: listData, total} = useSelector(selectObjectsList(listId));

  const {loading} = useRequestLoading(getObjectsListDataRequest);
  const {errorTexts} = useOnRequestError(getObjectsListDataRequest, '');

  const fetchListData = useCallback(() => {
    dispatch(getObjectsListDataRequest({categoryId, objectsIds}));
  }, [dispatch, categoryId, objectsIds]);

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
    navigateToObjectDetailsDebounced,
    sendIsFavoriteChangedEvent,
    suspenseViewLoading,
    suspenseViewError,
    paginationProps,
    fetchListData,
    listData,
  };
};
