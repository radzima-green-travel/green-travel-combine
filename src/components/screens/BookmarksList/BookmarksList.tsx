import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';
import {IProps} from './types';
import {selectBookmarksCategories} from 'core/selectors';

import {useSelector} from 'react-redux';
import {useToggleFavorite} from 'core/hooks';
import {findObjectsByCategoryId} from 'core/helpers';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {IExtendedObject} from 'core/types';
const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const BookmarksList = ({
  route,
  navigation: {setOptions, goBack, navigate},
}: IProps) => {
  const {
    params: {categoryId, title},
  } = route;

  const bookmarksCategories = useSelector(selectBookmarksCategories);

  const listData = useMemo(
    () =>
      bookmarksCategories
        ? findObjectsByCategoryId(bookmarksCategories, categoryId)
        : null,
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

  const navigateToObjectDetails = useCallback(
    ({_id, category}: IExtendedObject) => {
      navigate('ObjectDetails', {categoryId: category, objectId: _id});
    },
    [navigate],
  );

  return (
    <FlatList
      data={listData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <ObjectCard
          onIsFavoritePress={toggleFavorite}
          containerStyle={styles.cardContainer}
          data={item}
          width={cardWidth}
          onPress={navigateToObjectDetails}
        />
      )}
    />
  );
};
