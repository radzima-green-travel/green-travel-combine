import React from 'react';
import {View, ScrollView} from 'react-native';
import {styles} from './styles';
import {BookmarkItem, SuspenseView} from 'atoms';
import {isEmpty} from 'lodash';
import {BookmarksEmptyView} from 'molecules';
import {useBookmarks} from './hooks';
import {TestIDs} from 'core/types';
import {composeTestID} from 'core/helpers';

export const Bookmarks = () => {
  const {
    bookmarksCategories,
    getHomeData,
    loading,
    error,
    navigateToBookmarksList,
    syncFavoritesLoading,
  } = useBookmarks();

  return (
    <SuspenseView
      retryCallback={getHomeData}
      loading={(!bookmarksCategories && loading) || syncFavoritesLoading}
      error={bookmarksCategories ? null : error}>
      {isEmpty(bookmarksCategories) ? (
        <BookmarksEmptyView />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.boxContainer}>
            {bookmarksCategories?.map((category, index, items) => (
              <BookmarkItem
                key={category.categoryId}
                item={category}
                isOdd={index % 2 === 0}
                isLast={items.length - 1 === index}
                count={category.objectsIds.length}
                testID={composeTestID(TestIDs.FavoritesCard, index)}
                onPress={navigateToBookmarksList}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </SuspenseView>
  );
};
