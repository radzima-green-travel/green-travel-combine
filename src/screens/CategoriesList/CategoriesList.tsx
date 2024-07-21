import React from 'react';
import {FlatList} from 'react-native';
import {SuspenseView} from 'atoms';
import {CategoryCard} from 'molecules';
import {styles} from './styles';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useCategoriesList} from './hooks';
import {TestIDs} from 'core/types';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;

export const CategoriesList = () => {
  const {
    navigateToObjectDetails,
    suspenseViewLoading,
    suspenseViewError,
    paginationProps,
    fetchListData,
    listData,
  } = useCategoriesList();

  return (
    <SuspenseView
      loading={suspenseViewLoading}
      error={suspenseViewError}
      retryCallback={fetchListData}>
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
            testID={TestIDs.SubCategoryTitle}
          />
        )}
        {...paginationProps}
      />
    </SuspenseView>
  );
};
