import React from 'react';
import {Text, View} from 'react-native';
import {Chip, SuspenseView} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';

import {screenOptions} from './screenOptions';
import {themeStyles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useFilters} from './hooks';
import {FilterContainer} from './components';

export const Filters = () => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('filters');
  const {caregoriesData} = useFilters();

  return (
    <View style={styles.container}>
      <SuspenseView loading={false} error={null} retryCallback={() => {}}>
        <ScrollView>
          <Text style={styles.title}>{t('title')}</Text>
          <FilterContainer filterName="allCategories">
            <View style={styles.categoryList}>
              {caregoriesData?.map(category => (
                <Chip
                  testID={category.name}
                  text={category.name}
                  style={styles.chipContainer}
                />
              ))}
            </View>
          </FilterContainer>
          <FilterContainer filterName="whereToLook">
            <View />
          </FilterContainer>
          <FilterContainer filterName="ratingGoogle">
            <View />
          </FilterContainer>
        </ScrollView>
      </SuspenseView>
    </View>
  );
};

Filters.screenOptions = screenOptions;
