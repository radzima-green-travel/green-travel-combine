import {useCallback, useEffect, useLayoutEffect, useMemo} from 'react';

import {useBookmarksListAnalytics} from 'core/hooks';
import {IObject} from 'core/types';
import {useNavigation} from '@react-navigation/native';
import {
  BookmarksListScreenNavigationProps,
  BookmarksListScreenRouteProps,
} from '../types';
import {useRoute} from '@react-navigation/native';
import {useBookmarksObjects} from 'core/hooks';
import {orderBy} from 'lodash';
import {isAndroid} from 'services/PlatformService';

export const useBookmarksList = () => {
  const {navigate, setOptions, goBack} =
    useNavigation<BookmarksListScreenNavigationProps>();

  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useBookmarksListAnalytics();

  const navigateToObjectDetails = useCallback(
    ({id, name, category}: IObject) => {
      navigate('ObjectDetails', {objectId: id});
      sendSelectCardEvent(name, category.name);
    },
    [navigate, sendSelectCardEvent],
  );

  const sendIsFavoriteChangedEvent = useCallback(
    ({name, category}: IObject, nextIsFavoriteStatus: boolean) => {
      if (nextIsFavoriteStatus) {
        sendSaveCardEvent(name, category.name);
      } else {
        sendUnsaveCardEvent(name, category.name);
      }
    },
    [sendSaveCardEvent, sendUnsaveCardEvent],
  );

  const {
    params: {title, categoryId},
  } = useRoute<BookmarksListScreenRouteProps>();

  const listData = useBookmarksObjects(categoryId);

  const sortedListData = useMemo(() => {
    return listData
      ? orderBy(listData, [({name}) => name.toLowerCase()], 'asc')
      : null;
  }, [listData]);

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  const onLastObjectRemoveAnimationEnd = useCallback(() => {
    if (sortedListData?.length === 1) {
      goBack();
    }
  }, [goBack, sortedListData]);

  useEffect(() => {
    if (isAndroid && sortedListData?.length === 0) {
      goBack();
    }
  }, [goBack, onLastObjectRemoveAnimationEnd, sortedListData]);

  return {
    sortedListData,
    onLastObjectRemoveAnimationEnd,
    navigateToObjectDetails,
    sendIsFavoriteChangedEvent,
  };
};
