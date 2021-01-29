import React, {useLayoutEffect, useMemo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';
import {IProps} from './types';
import {selectAllCategoriesWithObjects} from 'core/selectors';

import {useSelector} from 'react-redux';
import {useToggleFavorite} from 'core/hooks';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {findObjectsByCategoryId} from 'core/helpers';
import {IExtendedObject} from 'core/types';
const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
export const ObjectsList = ({
  route,
  navigation: {setOptions, navigate},
}: IProps) => {
  const {
    params: {categoryId, title, objectsIds},
  } = route;

  const categoriesWithObjects = useSelector(selectAllCategoriesWithObjects);

  const listData = useMemo(
    () =>
      categoriesWithObjects
        ? findObjectsByCategoryId(categoriesWithObjects, categoryId, objectsIds)
        : null,
    [categoryId, categoriesWithObjects, objectsIds],
  );

  const navigateToObjectDetails = useCallback(
    ({_id}: IExtendedObject) => {
      navigate('ObjectDetails', {categoryId, objectId: _id});
    },
    [categoryId, navigate],
  );

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  const toggleFavorite = useToggleFavorite();

  return (
    <FlatList
      data={listData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <ObjectCard
          onPress={navigateToObjectDetails}
          onIsFavoritePress={toggleFavorite}
          containerStyle={styles.cardContainer}
          data={item}
          width={cardWidth}
        />
      )}
    />
  );
};
