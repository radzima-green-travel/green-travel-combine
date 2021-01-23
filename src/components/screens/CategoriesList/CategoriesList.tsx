import React, {useLayoutEffect, useMemo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {CategoryCard} from 'molecules';
import {styles} from './styles';
import {IProps} from './types';
import {selectAllCategoriesWithObjects} from 'core/selectors';

import {useSelector} from 'react-redux';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {findCategoriesById} from 'core/helpers';
import {ICategoryWithExtendedObjects} from 'core/types';
const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const CategoriesList = ({
  route,
  navigation: {setOptions, navigate},
}: IProps) => {
  const {
    params: {categoryId, title},
  } = route;

  const categoriesWithObjects = useSelector(selectAllCategoriesWithObjects);

  const listData = useMemo(
    () =>
      categoriesWithObjects
        ? findCategoriesById(categoriesWithObjects, categoryId)
        : null,
    [categoryId, categoriesWithObjects],
  );

  const navigateToObjectDetails = useCallback(
    ({_id, name}: ICategoryWithExtendedObjects) => {
      navigate('ObjectsList', {categoryId: _id, title: name});
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
      keyExtractor={(item) => item._id}
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
