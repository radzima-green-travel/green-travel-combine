import {useCallback, useMemo} from 'react';

import {useBookmarksObjects, useBookmarksListAnalytics} from 'core/hooks';
import {IObject} from 'core/types';
import {orderBy} from 'lodash';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  BookmarksListScreenNavigationProps,
  BookmarksListScreenRouteProps,
} from '../types';

export const useBookmarksList = () => {
  const {navigate, setOptions, goBack} =
    useNavigation<BookmarksListScreenNavigationProps>();
  const {
    params: {title, categoryId},
  } = useRoute<BookmarksListScreenRouteProps>();

  const listData = useBookmarksObjects(categoryId);

  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useBookmarksListAnalytics();

  const sortedListData = useMemo(() => {
    return listData
      ? orderBy(listData, [({name}) => name.toLowerCase()], 'asc')
      : null;
  }, [listData]);

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

  return {
    setOptions,
    sortedListData,
    goBack,
    title,
    navigateToObjectDetails,
    sendIsFavoriteChangedEvent,
  };
};
