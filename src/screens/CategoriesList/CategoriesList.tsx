import React, {useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {CategoryCard} from 'molecules';
import {styles} from './styles';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useCategoriesList} from './hooks';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const CategoriesList = () => {
  const {setOptions, title, listData, navigateToObjectDetails} =
    useCategoriesList();

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
