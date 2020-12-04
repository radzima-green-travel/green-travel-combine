import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'atoms';
import {styles} from './styles';
import {IProps} from './types';
import {selectBookmarksCategories} from 'core/selectors';

import {useSelector} from 'react-redux';
import {useToggleFavorite} from 'core/hooks';
import {find} from 'lodash';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

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
      renderItem={({item: {_id, name, cover, isFavorite}}) => (
        <ObjectCard
          onIsFavoriteChange={toggleFavorite}
          containerStyle={styles.cardContainer}
          id={_id}
          name={name}
          imageUri={cover}
          isFavorite={isFavorite}
          width={cardWidth}
        />
      )}
    />
  );
};
