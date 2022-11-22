import {useCallback} from 'react';

import {useBookmarksListAnalytics} from 'core/hooks';
import {IObject} from 'core/types';
import {useNavigation} from '@react-navigation/native';
import {BookmarksListScreenNavigationProps} from '../types';

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

  return {
    setOptions,
    goBack,
    navigateToObjectDetails,
    sendIsFavoriteChangedEvent,
  };
};
