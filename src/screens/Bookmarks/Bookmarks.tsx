import React from 'react';
import {View, ScrollView} from 'react-native';
import {styles} from './styles';
import {BookmarkItem, SuspenseView} from 'atoms';
import {isEmpty} from 'lodash';
import {BookmarksEmptyView} from 'molecules';
import {useBookmarks} from './hooks';
import {useSelector} from 'react-redux';
import {selectBookmarksCardsData} from 'core/selectors';

export const Bookmarks = () => {
  const {getHomeData, loading, error, navigateToBookmarksList} = useBookmarks();

  const bookmarksCategories = useSelector(selectBookmarksCardsData);

  return (
    <SuspenseView
      retryCallback={getHomeData}
      loading={!bookmarksCategories && loading}
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
                onPress={navigateToBookmarksList}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </SuspenseView>
  );
};
