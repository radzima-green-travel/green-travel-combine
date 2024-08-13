import React from 'react';
import {View, ScrollView} from 'react-native';
import {styles} from './styles';
import {BookmarkItem, SuspenseView} from 'atoms';
import {BookmarksEmptyView} from 'molecules';
import {useBookmarks} from './hooks';
import {TestIDs} from 'core/types';

export const Bookmarks = () => {
  const {
    showEmptyView,
    bookmarksCategories,
    fetchInitialObjectsData,
    loading,
    error,
    navigateToBookmarksList,
  } = useBookmarks();

  return (
    <SuspenseView
      retryCallback={fetchInitialObjectsData}
      loading={loading}
      error={error}>
      {showEmptyView ? (
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
                testID={TestIDs.FavoritesCard}
                onPress={navigateToBookmarksList}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </SuspenseView>
  );
};
