import React, {useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useObjectsList} from './hooks';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
export const ObjectsList = () => {
  const {
    title,
    sortedListData,
    navigateToObjectDetailsDebounced,
    sendIsFavoriteChangedEvent,
    setOptions,
  } = useObjectsList();

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
