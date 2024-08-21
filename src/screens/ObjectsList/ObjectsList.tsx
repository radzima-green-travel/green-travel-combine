import React from 'react';
import {FlatList} from 'react-native';
import {SuspenseView} from 'atoms';
import {ObjectCard} from 'molecules';
import {styles} from './styles';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useObjectsList} from './hooks';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
export const ObjectsList = () => {
  const {
    navigateToObjectDetailsDebounced,
    sendIsFavoriteChangedEvent,
    initialDataLoading,
    fetchListInitialData,
    paginationProps,
    errorTexts,
    listData,
  } = useObjectsList();

  return (
    <SuspenseView
      loading={initialDataLoading}
      error={errorTexts}
      testID="objectsListSuspenseView"
      retryCallback={fetchListInitialData}>
      <FlatList
        data={listData}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ObjectCard
            onPress={navigateToObjectDetailsDebounced}
            containerStyle={styles.cardContainer}
            data={item}
            width={cardWidth}
            onFavoriteChanged={sendIsFavoriteChangedEvent}
            testID={'objectCard'}
          />
        )}
        {...paginationProps}
      />
    </SuspenseView>
  );
};
