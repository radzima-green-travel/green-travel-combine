import React, {useCallback, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';
import {IProps} from './types';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useBookmarksObjects} from 'core/hooks';
import {IObject} from 'core/types';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const BookmarksList = ({
  route,
  navigation: {setOptions, goBack, navigate},
}: IProps) => {
  const {
    params: {title, categoryId},
  } = route;

  const listData = useBookmarksObjects(categoryId);

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

  const navigateToObjectDetails = useCallback(
    ({_id, category}: IObject) => {
      navigate('ObjectDetails', {categoryId: category, objectId: _id});
    },
    [navigate],
  );

  return (
    <FlatList
      data={listData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <ObjectCard
          removeFavoriteWithAnimation={true}
          onRemoveAnimationEnd={onLastObjectRemoveAnimationEnd}
          containerStyle={styles.cardContainer}
          data={item}
          width={cardWidth}
          onPress={navigateToObjectDetails}
        />
      )}
    />
  );
};
