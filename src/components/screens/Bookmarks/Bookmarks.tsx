import React, {useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {styles} from './styles';
import {BookmarkItem, SuspenseView} from 'atoms';
import {selectBookmarksCardsData} from 'core/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {
  useRequestError,
  useRequestLoading,
  useBookmarksAnalytics,
} from 'core/hooks';
import {getInitialHomeDataRequest} from 'core/reducers';
import {IProps} from './types';
import {IBookmarkItem} from 'core/types';
import {isEmpty} from 'lodash';
import {BookmarksEmptyView} from 'molecules';

export const Bookmarks = ({navigation}: IProps) => {
  const bookmarksCategories = useSelector(selectBookmarksCardsData);
  const dispatch = useDispatch();
  const {sendSelectSavedCategoryEvent} = useBookmarksAnalytics();

  const getHomeData = useCallback(() => {
    dispatch(getInitialHomeDataRequest());
  }, [dispatch]);

  const {loading} = useRequestLoading(getInitialHomeDataRequest);
  const {error} = useRequestError(getInitialHomeDataRequest);

  const navigateToBookmarksList = useCallback(
    ({categoryName, categoryId}: IBookmarkItem) => {
      navigation.navigate('BookmarksList', {
        title: categoryName,
        categoryId: categoryId,
      });
      sendSelectSavedCategoryEvent(categoryName);
    },
    [navigation, sendSelectSavedCategoryEvent],
  );

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
            {bookmarksCategories!.map((category, index, items) => (
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
