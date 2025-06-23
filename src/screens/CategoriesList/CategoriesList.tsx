import React from 'react';
import {FlatList} from 'react-native';
import {CategoryCard, SuspenseView} from 'molecules';
import {styles} from './styles';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useCategoriesList} from './hooks';
import {idKeyExtractor} from 'core/utils/react';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const CategoriesList = () => {
  const {
    navigateToObjectDetails,
    fetchListInitialData,
    initialDataLoading,
    paginationProps,
    errorTexts,
    listData,
  } = useCategoriesList();

  return (
    <SuspenseView
      loading={initialDataLoading}
      error={errorTexts}
      retryCallback={fetchListInitialData}
      testID={'categoriesListSuspense'}>
      <FlatList
        data={listData}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={idKeyExtractor}
        renderItem={({item}) => (
          <CategoryCard
            onPress={navigateToObjectDetails}
            containerStyle={styles.cardContainer}
            data={item}
            width={cardWidth}
            testID={'categoryCard'}
          />
        )}
        {...paginationProps}
      />
    </SuspenseView>
  );
};
