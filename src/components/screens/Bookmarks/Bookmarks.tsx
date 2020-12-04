import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {BookmarkItem, SuspenseView} from 'atoms';
import {selectBookmarksCategories} from 'core/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {useRequestError, useRequestLoading} from 'core/hooks';
import {getHomeDataRequest} from 'core/reducers';
import {IProps} from './types';
import {ICategory} from 'core/types';
import {isEmpty} from 'lodash';

export const Bookmarks = ({navigation}: IProps) => {
  const bookmarksCategories = useSelector(selectBookmarksCategories);
  const dispatch = useDispatch();

  const getHomeData = useCallback(() => {
    dispatch(getHomeDataRequest());
  }, [dispatch]);

  const loading = useRequestLoading(getHomeDataRequest);
  const {error} = useRequestError(getHomeDataRequest);

  const navigateToBookmarksList = useCallback(
    ({_id, name, objects}: ICategory) => {
      if (!isEmpty(objects)) {
        navigation.navigate('BookmarksList', {
          categoryId: _id,
          title: name,
        });
      }
    },
    [navigation],
  );

  return (
    <SuspenseView
      retryCallback={getHomeData}
      loading={!bookmarksCategories && loading}
      error={bookmarksCategories ? null : error}>
      {bookmarksCategories ? (
        <View style={styles.container}>
          <Text style={[styles.title]}>{'Закладки'}</Text>
          <View style={styles.boxContainer}>
            {bookmarksCategories.map((category, index, items) => (
              <BookmarkItem
                item={category}
                isOdd={index % 2 === 0}
                isLast={items.length - 1 === index}
                count={category.objects.length}
                onPress={navigateToBookmarksList}
              />
            ))}
          </View>
        </View>
      ) : null}
    </SuspenseView>
  );
};
