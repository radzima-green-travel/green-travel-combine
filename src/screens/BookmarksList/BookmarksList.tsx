import React from 'react';
import { FlatList } from 'react-native';
import { ObjectCard, SuspenseView } from 'molecules';
import { styles } from './styles';

import { isIOS, SCREEN_WIDTH } from 'services/PlatformService';
import { PADDING_HORIZONTAL } from 'core/constants';
import { useBookmarksList } from './hooks';
import { idKeyExtractor } from 'core/utils/react';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const BookmarksList = () => {
  const {
    retryFetchListData,
    errorTexts,
    loading,
    filteredListData,
    onLastObjectRemoveAnimationEnd,
    navigateToObjectDetails,
    sendIsFavoriteChangedEvent,
  } = useBookmarksList();

  return (
    <SuspenseView
      loading={loading}
      retryCallback={retryFetchListData}
      testID={'bookmarksListSuspense'}
      error={errorTexts}>
      <FlatList
        data={filteredListData}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={idKeyExtractor}
        renderItem={({ item }) => (
          <ObjectCard
            removeFavoriteWithAnimation={isIOS}
            onRemoveAnimationEnd={onLastObjectRemoveAnimationEnd}
            containerStyle={styles.cardContainer}
            data={item}
            width={cardWidth}
            onPress={navigateToObjectDetails}
            onFavoriteChanged={sendIsFavoriteChangedEvent}
            testID={'objectCard'}
          />
        )}
      />
    </SuspenseView>
  );
};
