import {useMemo, useCallback} from 'react';

import {
  useCategoryObjects,
  useObjects,
  useObjectsListAnalytics,
} from 'core/hooks';
import {IObject} from 'core/types';
import {debounce, orderBy} from 'lodash';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ObjectsListScreenNavigationProps,
  ObjectsListScreenRouteProps,
} from '../types';

export const useObjectsList = () => {
  const {push, setOptions} = useNavigation<ObjectsListScreenNavigationProps>();
  const {
    params: {categoryId, title, objectsIds},
  } = useRoute<ObjectsListScreenRouteProps>();

  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useObjectsListAnalytics();

  const listData = useCategoryObjects(categoryId);

  const listDataByIds = useObjects(objectsIds || []);

  const navigateToObjectDetails = useCallback(
    ({id, name, category}: IObject) => {
      push('ObjectDetails', {objectId: id});
      sendSelectCardEvent(name, category.name);
    },
    [push, sendSelectCardEvent],
  );

  const sortedListData = useMemo(() => {
    const data = objectsIds ? listDataByIds : listData;
    return data ? orderBy(data, [({name}) => name.toLowerCase()], 'asc') : null;
  }, [listData, listDataByIds, objectsIds]);

  const navigateToObjectDetailsDebounced = useMemo(
    () =>
      debounce(navigateToObjectDetails, 300, {leading: true, trailing: false}),
    [navigateToObjectDetails],
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
    title,
    sortedListData,
    navigateToObjectDetailsDebounced,
    sendIsFavoriteChangedEvent,
    setOptions,
  };
};
