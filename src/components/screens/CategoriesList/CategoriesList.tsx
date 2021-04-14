import React, {useLayoutEffect, useCallback} from 'react';
import {FlatList} from 'react-native';
import {CategoryCard} from 'molecules';
import {styles} from './styles';
import {IProps} from './types';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {ITransformedCategory} from 'core/types';
import {useCategoryChildren} from 'core/hooks';
const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const CategoriesList = ({
  route,
  navigation: {setOptions, navigate},
}: IProps) => {
  const {
    params: {categoryId, title},
  } = route;

  const listData = useCategoryChildren(categoryId);

  const navigateToObjectDetails = useCallback(
    ({id, name}: ITransformedCategory) => {
      navigate('ObjectsList', {categoryId: id, title: name});
    },
    [navigate],
  );

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  return (
    <FlatList
      data={listData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <CategoryCard
          onPress={navigateToObjectDetails}
          containerStyle={styles.cardContainer}
          data={item}
          width={cardWidth}
        />
      )}
    />
  );
};
