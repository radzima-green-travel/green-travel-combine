import {useMemo, useCallback, useLayoutEffect, useEffect} from 'react';

import {
  useListPagination,
  useObjectsListAnalytics,
  useOnRequestError,
  useRequestLoading,
} from 'core/hooks';
import {CardItem} from 'core/types';
import {debounce, omit} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {
  ObjectsListScreenNavigationProps,
  ObjectsListScreenRouteProps,
} from '../types';
import {useRoute} from '@react-navigation/native';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {selectObjectsList} from 'selectors';
import {
  getObjectsListInitialDataRequest,
  getObjectsListNextDataRequest,
} from 'core/actions';

export const useObjectsList = () => {
  const dispatch = useDispatch();

  const {push, setOptions} = useNavigation<ObjectsListScreenNavigationProps>();

  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useObjectsListAnalytics();

  const navigateToObjectDetails = useCallback(
    ({id, name, cover, blurhash, analyticsMetadata}: CardItem) => {
      push('ObjectDetails', {
        objectId: id,
        objectCoverImageUrl: cover,
        objcetCoverBlurhash: blurhash,
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

  const {params} = useRoute<ObjectsListScreenRouteProps>();

  const [title, appliedFilters] = useMemo(() => {
    return [params.title, omit(params, 'title')];
  }, [params]);

  const listId = createObjectListId(appliedFilters);

  const {data: listData, total} = useSelector(selectObjectsList(listId));

  const {loading: initialDataLoading} = useRequestLoading(
    getObjectsListInitialDataRequest,
  );
  const {loading: nextDataLoading} = useRequestLoading(
    getObjectsListNextDataRequest,
  );
  const {errorTexts} = useOnRequestError(getObjectsListInitialDataRequest, '');

  const fetchListInitialData = useCallback(() => {
    dispatch(getObjectsListInitialDataRequest({listId, ...appliedFilters}));
  }, [dispatch, appliedFilters, listId]);

  const fetchListNextData = useCallback(() => {
    dispatch(getObjectsListNextDataRequest({listId, ...appliedFilters}));
  }, [dispatch, appliedFilters, listId]);

  const paginationProps = useListPagination({
    isLoading: nextDataLoading,
    loadMore: fetchListNextData,
    hasMoreToLoad: listData.length < total,
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
    navigateToObjectDetailsDebounced,
    sendIsFavoriteChangedEvent,
    initialDataLoading,
    fetchListInitialData,
    paginationProps,
    errorTexts,
    listData,
  };
};

export const createObjectListId = (appliedFilters: object) => {
  let id = '';

  for (const key in appliedFilters) {
    id += key + String(appliedFilters[key]);
  }

  return id;
};
