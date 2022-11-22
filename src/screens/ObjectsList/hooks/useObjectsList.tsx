import {useMemo, useCallback} from 'react';

import {useObjectsListAnalytics} from 'core/hooks';
import {IObject} from 'core/types';
import {debounce} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {ObjectsListScreenNavigationProps} from '../types';

export const useObjectsList = () => {
  const {push, setOptions} = useNavigation<ObjectsListScreenNavigationProps>();

  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useObjectsListAnalytics();

  const navigateToObjectDetails = useCallback(
    ({id, name, category}: IObject) => {
      push('ObjectDetails', {objectId: id});
      sendSelectCardEvent(name, category.name);
    },
    [push, sendSelectCardEvent],
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

  const navigateToObjectDetailsDebounced = useMemo(
    () =>
      debounce(navigateToObjectDetails, 300, {leading: true, trailing: false}),
    [navigateToObjectDetails],
  );

  return {
    navigateToObjectDetailsDebounced,
    sendIsFavoriteChangedEvent,
    setOptions,
  };
};
