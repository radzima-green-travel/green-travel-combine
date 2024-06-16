import React from 'react';
import {Text, View} from 'react-native';
import {Chip, Multiswitch, SuspenseView} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';

import {screenOptions} from './screenOptions';
import {themeStyles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useFilters} from './hooks';
import {FilterContainer, LineItemContainer} from './components';
import {TestIDs} from 'core/types';

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
            <LineItemContainer itemName="settlements">
              <Text>Test</Text>
            </LineItemContainer>
            <LineItemContainer itemName="geolocation">
              <Text>Test</Text>
            </LineItemContainer>
            <LineItemContainer itemName="considerDistance">
              <Text>Test</Text>
            </LineItemContainer>
          </FilterContainer>
          <FilterContainer filterName="ratingGoogle">
            <Multiswitch
              multiswitchItems={['Any', '3,5+', '4+', '4,5+']}
              onItemPress={() => {}}
              testID={TestIDs.FiltersMultySwitch}
            />
          </FilterContainer>
          <LineItemContainer
            itemName="hideVisit"
            style={styles.hideVisitContainer}>
            <Text>Test</Text>
          </LineItemContainer>
        </ScrollView>
      </SuspenseView>
    </View>
  );
};

Filters.screenOptions = screenOptions;
