import {useCallback, useEffect, useLayoutEffect, useRef} from 'react';

import {
  useBookmarksListAnalytics,
  useBookmarksObjects,
  useOnRequestError,
  useRequestLoading,
} from 'core/hooks';
import {CardItem} from 'core/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  BookmarksListScreenNavigationProps,
  BookmarksListScreenRouteProps,
} from '../types';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {getBookmarksObjectsListRequest} from 'core/actions';
import {useDispatch, useSelector} from 'react-redux';
import {isAndroid} from 'services/PlatformService';
import {selectBookmarksObjectsList} from 'selectors';

export const useBookmarksList = () => {
  const dispatch = useDispatch();
  const {navigate, setOptions, goBack} =
    useNavigation<BookmarksListScreenNavigationProps>();

  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useBookmarksListAnalytics();

  const navigateToObjectDetails = useCallback(
    ({id, name, cover, blurhash, analyticsMetadata}: CardItem) => {
      navigate('ObjectDetails', {
        objectId: id,
        objectCoverImageUrl: cover,
        objcetCoverBlurhash: blurhash,
        analytics: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
      sendSelectCardEvent(name, analyticsMetadata.categoryName);
    },
    [navigate, sendSelectCardEvent],
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
    params: {title, objectsIds, categoryId},
  } = useRoute<BookmarksListScreenRouteProps>();

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
      goBack();
    }
  }, [filteredListData, goBack]);

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
      goBack();
    }

    prevListDataLength.current = filteredListData.length;
  }, [goBack, onLastObjectRemoveAnimationEnd, filteredListData, loading]);

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
