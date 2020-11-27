import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'atoms';
import {styles} from './styles';
import {IProps} from './types';
import {selectBookmarksCategories} from 'core/selectors';

import {useSelector} from 'react-redux';
import {useToggleFavorite} from 'core/hooks';
import {find} from 'lodash';

export const BookmarksList = ({
  route,
  navigation: {setOptions, goBack},
}: IProps) => {
  const {
    params: {categoryId, title},
  } = route;

  const bookmarksCategories = useSelector(selectBookmarksCategories);

  const listData = useMemo(
    () => find(bookmarksCategories, ({_id}) => _id === categoryId)?.objects,
    [categoryId, bookmarksCategories],
  );

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  const onLastObjectRemoveAnimationEnd = useCallback(() => {
    if (listData?.length === 1) {
      goBack();
    }
  }, [goBack, listData]);

  const toggleFavorite = useToggleFavorite({
    removeWithAnimation: true,
    onAnimationEnd: onLastObjectRemoveAnimationEnd,
  });

  return (
    <FlatList
      data={listData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <ObjectCard
          onIsFavoriteChange={toggleFavorite}
          containerStyle={styles.cardContainer}
          data={item}
        />
      )}
    />
  );
};
