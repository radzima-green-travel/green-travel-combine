import {useMemo, useCallback, useLayoutEffect} from 'react';

import {useObjectsListAnalytics} from 'core/hooks';
import {IObject} from 'core/types';
import {debounce} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {
  ObjectsListScreenNavigationProps,
  ObjectsListScreenRouteProps,
} from '../types';
import {useCategoryObjects, useObjects} from 'core/hooks';
import {useRoute} from '@react-navigation/native';
import {orderBy} from 'lodash';
import {getAnalyticsNavigationScreenName} from 'core/helpers';

export const useObjectsList = () => {
  const {push, setOptions} = useNavigation<ObjectsListScreenNavigationProps>();

  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useObjectsListAnalytics();

  const navigateToObjectDetails = useCallback(
    ({id, name, category}: IObject) => {
      push('ObjectDetails', {
        objectId: id,
        analytics: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
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

  const {
    params: {categoryId, title, objectsIds},
  } = useRoute<ObjectsListScreenRouteProps>();

  const listData = useCategoryObjects(categoryId);

  const listDataByIds = useObjects(objectsIds || []);

  const sortedListData = useMemo(() => {
    const data = objectsIds ? listDataByIds : listData;
    return data ? orderBy(data, [({name}) => name.toLowerCase()], 'asc') : null;
  }, [listData, listDataByIds, objectsIds]);

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  return {
    sortedListData,
    navigateToObjectDetailsDebounced,
    sendIsFavoriteChangedEvent,
  };
};
