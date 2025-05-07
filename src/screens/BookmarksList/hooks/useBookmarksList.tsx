import {useCallback, useEffect, useLayoutEffect, useMemo, useRef} from 'react';

import {getBookmarksObjectsListRequest} from 'core/actions';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {
  useBookmarksListAnalytics,
  useBookmarksObjects,
  useOnRequestError,
  useRequestLoading,
} from 'core/hooks';
import {CardItem, RouteQueryParams} from 'core/types';
import {useLocalSearchParams, useNavigation, useRouter} from 'expo-router';
import {split} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {selectBookmarksObjectsList} from 'selectors';
import {isAndroid} from 'services/PlatformService';

export const useBookmarksList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {setOptions} = useNavigation();

  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useBookmarksListAnalytics();

  const navigateToObjectDetails = useCallback(
    ({id, name, cover, blurhash, analyticsMetadata}: CardItem) => {
      router.navigate({
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

  const {
    title,
    objectsIds: objectIdsProp,
    categoryId,
  } = useLocalSearchParams<RouteQueryParams.ObjectList>();

  const objectsIds = useMemo(() => split(objectIdsProp, ','), [objectIdsProp]);

  const listData = useSelector(selectBookmarksObjectsList(categoryId));

  const {filteredListData, newBookmarksIds, bookmarksIds} = useBookmarksObjects(
    listData,
    categoryId,
  );

  const {loading: bookmarksObjectsLoading} = useRequestLoading(
    getBookmarksObjectsListRequest,
  );
  const {errorTexts} = useOnRequestError(getBookmarksObjectsListRequest, '');

  const loading = !listData.length && bookmarksObjectsLoading;

  const prevListDataLength = useRef<number>(0);

  const onLastObjectRemoveAnimationEnd = useCallback(() => {
    if (filteredListData.length === 1) {
      router.back();
    }
  }, [filteredListData.length, router]);

  const bookmarksFilled = !!bookmarksIds.length;

  const fetchListData = useCallback(
    (currentObjectIds: string[]) => {
      if (bookmarksFilled) {
        dispatch(
          getBookmarksObjectsListRequest({
            listId: categoryId,
            objectsIds: currentObjectIds,
            categoryId,
          }),
        );
      }
    },
    [categoryId, dispatch, bookmarksFilled],
  );

  const listDataLoaded = !!listData.length;

  useLayoutEffect(() => {
    !listDataLoaded && fetchListData(objectsIds);
  }, [fetchListData, objectsIds, listDataLoaded]);

  const retryFetchListData = useCallback(
    () => fetchListData(objectsIds),
    [objectsIds, fetchListData],
  );

  useEffect(() => {
    if (newBookmarksIds.length && !bookmarksObjectsLoading) {
      fetchListData(newBookmarksIds);
    }
  }, [fetchListData, newBookmarksIds, bookmarksObjectsLoading]);

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  useEffect(() => {
    if (
      isAndroid &&
      prevListDataLength.current > filteredListData.length &&
      filteredListData.length === 0
    ) {
      router.back();
    }

    prevListDataLength.current = filteredListData.length;
  }, [router, onLastObjectRemoveAnimationEnd, filteredListData, loading]);

  return {
    retryFetchListData,
    errorTexts,
    loading,
    filteredListData,
    onLastObjectRemoveAnimationEnd,
    navigateToObjectDetails,
    sendIsFavoriteChangedEvent,
  };
};
