import React, {useLayoutEffect, useMemo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';
import {IProps} from './types';

import {
  useCategoryObjects,
  useObjects,
  useObjectsListAnalytics,
} from 'core/hooks';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {IObject} from 'core/types';
import {debounce, orderBy} from 'lodash';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
export const ObjectsList = ({
  route,
  navigation: {setOptions, push},
}: IProps) => {
  const {
    params: {categoryId, title, objectsIds},
  } = route;

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

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  return (
    <FlatList
      data={sortedListData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ObjectCard
          onPress={navigateToObjectDetailsDebounced}
          containerStyle={styles.cardContainer}
          data={item}
          width={cardWidth}
          onFavoriteChanged={sendIsFavoriteChangedEvent}
        />
      )}
    />
  );
};
