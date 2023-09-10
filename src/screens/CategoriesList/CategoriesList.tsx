import React from 'react';
import {FlatList} from 'react-native';
import {CategoryCard} from 'molecules';
import {styles} from './styles';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useCategoriesList} from './hooks';
import {TestIDs} from 'core/types';
import {composeTestID} from 'core/helpers';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const CategoriesList = () => {
  const {listData, navigateToObjectDetails} = useCategoriesList();

  return (
    <FlatList
      data={listData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        const testID = composeTestID(TestIDs.SubCategoryTitle, item.name);

        return (
          <CategoryCard
            onPress={navigateToObjectDetails}
            containerStyle={styles.cardContainer}
            data={item}
            width={cardWidth}
            testID={testID}
          />
        );
      }}
    />
  );
};
