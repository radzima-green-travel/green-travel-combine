import React, {useLayoutEffect, useMemo} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'atoms';
import {styles} from './styles';
import {IProps} from './types';
import {find} from 'lodash';
import {selectAllCategoriesWithObjects} from 'core/selectors';

import {useSelector} from 'react-redux';
import {useToggleFavorite} from 'core/hooks';

export const ObjectsList = ({route, navigation: {setOptions}}: IProps) => {
  const {
    params: {categoryId, title},
  } = route;

  const categoriesWithObjects = useSelector(selectAllCategoriesWithObjects);

  const listData = useMemo(
    () => find(categoriesWithObjects, ({_id}) => _id === categoryId)?.objects,
    [categoryId, categoriesWithObjects],
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
          onIsFavoriteChange={toggleFavorite}
          containerStyle={styles.cardContainer}
          data={item}
        />
      )}
    />
  );
};
