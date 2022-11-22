import React, {useCallback, useEffect, useLayoutEffect, useMemo} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';

import {isAndroid, isIOS, SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useBookmarksList} from './hooks';
import {useRoute} from '@react-navigation/native';
import {BookmarksListScreenRouteProps} from './types';
import {useBookmarksObjects} from 'core/hooks';
import {orderBy} from 'lodash';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const BookmarksList = () => {
  const {
    setOptions,
    goBack,
    navigateToObjectDetails,
    sendIsFavoriteChangedEvent,
  } = useBookmarksList();

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

  return (
    <FlatList
      data={sortedListData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ObjectCard
          removeFavoriteWithAnimation={isIOS}
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
