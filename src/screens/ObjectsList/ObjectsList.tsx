import React, {useLayoutEffect, useMemo} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useObjectsList} from './hooks';
import {useCategoryObjects, useObjects} from 'core/hooks';
import {useRoute} from '@react-navigation/native';
import {ObjectsListScreenRouteProps} from './types';
import {orderBy} from 'lodash';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
export const ObjectsList = () => {
  const {
    navigateToObjectDetailsDebounced,
    sendIsFavoriteChangedEvent,
    setOptions,
  } = useObjectsList();

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
