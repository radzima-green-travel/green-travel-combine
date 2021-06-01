import React, {useCallback, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';
import {IProps} from './types';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useBookmarksObjects} from 'core/hooks';
import {IObject} from 'core/types';
import {useMemo} from 'react';
import {orderBy} from 'lodash';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const BookmarksList = ({
  route,
  navigation: {setOptions, goBack, navigate},
}: IProps) => {
  const {
    params: {title, categoryId},
  } = route;

  const listData = useBookmarksObjects(categoryId);

  const sortedListData = useMemo(() => {
    return listData
      ? orderBy(listData, [({name}) => name.toLowerCase()], 'asc')
      : null;
  }, [listData]);

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  const onLastObjectRemoveAnimationEnd = useCallback(() => {
    if (sortedListData?.length === 1) {
      goBack();
    }
  }, [goBack, sortedListData]);

  const navigateToObjectDetails = useCallback(
    ({id, category}: IObject) => {
      navigate('ObjectDetails', {categoryId: category.id, objectId: id});
    },
    [navigate],
  );

  return (
    <FlatList
      data={sortedListData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item.id}
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
