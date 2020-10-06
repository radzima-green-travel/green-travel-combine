import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {BookmarkItem, SuspenseView} from 'atoms';
import {
  selectBookmarksCategories,
  selectHomeData,
  selectSavedBookmarksIds,
} from 'core/selectors';
import {useSelector} from 'react-redux';
import {useRequestError, useRequestLoading} from 'core/hooks';
import {getHomeDataRequest} from 'core/reducers';
import {includes} from 'lodash';

export const Bookmarks = ({navigation}) => {
  const bookmarksCategories = useSelector(selectBookmarksCategories);
  const homeData = useSelector(selectHomeData);
  const savedBookmarksIds = useSelector(selectSavedBookmarksIds);

  const loading = useRequestLoading(getHomeDataRequest);
  const {error} = useRequestError(getHomeDataRequest);

  const navigateToObjectsList = useCallback(
    ({categoryId, title}) => {
      const data = homeData
        ?.find((category) => category._id === categoryId)
        ?.items.filter((object) =>
          includes(savedBookmarksIds?.[categoryId], object._id),
        );

      navigation.navigate('ObjectsList', {data, title});
    },
    [navigation],
  );

  return (
    <SuspenseView loading={loading} error={error}>
      {bookmarksCategories ? (
        <View style={styles.container}>
          <Text style={styles.title}>{'Закладки'}</Text>
          <View style={styles.boxContainer}>
            {bookmarksCategories.map(({name, _id}, index) => (
              <BookmarkItem
                text={name}
                isOdd={index % 2 === 0}
                count={savedBookmarksIds?.[_id]?.length}
                onPress={() => {
                  navigateToObjectsList({categoryId: _id, title: name});
                }}
              />
            ))}
          </View>
        </View>
      ) : null}
    </SuspenseView>
  );
};
