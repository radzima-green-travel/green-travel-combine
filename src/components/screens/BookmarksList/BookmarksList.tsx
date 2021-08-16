import React, {useCallback, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';
import {IProps} from './types';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useBookmarksObjects, useBookmarksListAnalytics} from 'core/hooks';
import {IObject} from 'core/types';
import {useMemo} from 'react';
import {orderBy} from 'lodash';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const BookmarksList = ({
  route,
  navigation: {setOptions, goBack, navigate},
}: IProps) => {
  const {
    params: {title, categoryId},
  } = route;

  const listData = useBookmarksObjects(categoryId);

  const {
    sendSaveCardEvent,
    sendSelectCardEvent,
    sendUnsaveCardEvent,
  } = useBookmarksListAnalytics();

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

  return (
    <FlatList
      data={sortedListData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ObjectCard
          removeFavoriteWithAnimation={true}
          onRemoveAnimationEnd={onLastObjectRemoveAnimationEnd}
          containerStyle={styles.cardContainer}
          data={item}
          width={cardWidth}
          onPress={navigateToObjectDetails}
          onFavoriteChanged={sendIsFavoriteChangedEvent}
        />
      )}
    />
  );
};
