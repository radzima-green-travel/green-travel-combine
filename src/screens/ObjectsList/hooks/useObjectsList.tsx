import {useMemo, useCallback, useLayoutEffect, useEffect} from 'react';

import {
  useListPagination,
  useObjectsListAnalytics,
  useOnRequestError,
  useRequestLoading,
} from 'core/hooks';
import {CardItem, RouteQueryParams} from 'core/types';
import {debounce, split} from 'lodash';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {selectObjectsList} from 'selectors';
import {
  getObjectsListInitialDataRequest,
  getObjectsListNextDataRequest,
} from 'core/actions';
import {useRouter, useNavigation, useLocalSearchParams} from 'expo-router';

export const useObjectsList = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const {setOptions} = useNavigation();

  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useObjectsListAnalytics();

  const navigateToObjectDetails = useCallback(
    ({id, name, cover, blurhash, analyticsMetadata}: CardItem) => {
      router.push({
        pathname: '/object/[objectId]',
        params: {
          objectId: id,
          objectCoverImageUrl: cover,
          objcetCoverBlurhash: blurhash,
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });

      sendSelectCardEvent(name, analyticsMetadata.categoryName);
    },
    [router, sendSelectCardEvent],
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

  const {title, objectsIds, markedAsNotOnGoogleMaps, categoryId} =
    useLocalSearchParams<RouteQueryParams.ObjectList>();

  const appliedFilters = useMemo(() => {
    return {
      objectsIds: objectsIds ? split(objectsIds, ',') : undefined,
      ...(markedAsNotOnGoogleMaps && {
        markedAsNotOnGoogleMaps: markedAsNotOnGoogleMaps === 'true',
      }),
      categoryId,
    };
  }, [categoryId, markedAsNotOnGoogleMaps, objectsIds]);

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
