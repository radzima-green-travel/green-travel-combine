import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {BookmarkItem, SuspenseView} from 'atoms';
import {
  selectBookmarksCategories,
  selectSavedBookmarksIds,
} from 'core/selectors';
import {useSelector} from 'react-redux';
import {useRequestError, useRequestLoading} from 'core/hooks';
import {getHomeDataRequest} from 'core/reducers';
import {IProps} from './types';
import {ICategory} from 'core/types';
import {isEmpty} from 'lodash';

export const Bookmarks = ({navigation}: IProps) => {
  const bookmarksCategories = useSelector(selectBookmarksCategories);
  const savedBookmarksIds = useSelector(selectSavedBookmarksIds);

  const loading = useRequestLoading(getHomeDataRequest);
  const {error} = useRequestError(getHomeDataRequest);

  const navigateToObjectsList = useCallback(
    ({_id, name}: ICategory) => {
      const objectIds = savedBookmarksIds?.[_id];
      if (!isEmpty(objectIds)) {
        navigation.navigate('BookmarksList', {
          objectIds: objectIds!,
          title: name,
        });
      }
    },
    [navigation, savedBookmarksIds],
  );

  return (
    <SuspenseView loading={loading} error={error}>
      {bookmarksCategories ? (
        <View style={styles.container}>
          <Text style={styles.title}>{'Закладки'}</Text>
          <View style={styles.boxContainer}>
            {bookmarksCategories.map((category, index) => (
              <BookmarkItem
                item={category}
                isOdd={index % 2 === 0}
                count={savedBookmarksIds?.[category._id]?.length}
                onPress={navigateToObjectsList}
              />
            ))}
          </View>
        </View>
      ) : null}
    </SuspenseView>
  );
};
