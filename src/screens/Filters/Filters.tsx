import React, {useMemo} from 'react';
import {Text, View, Switch, TouchableOpacity} from 'react-native';
import {Chip, Multiswitch, SuspenseView, Button, Icon} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {ButtonsGroup, FiltersSectionContainer} from 'molecules';
import {screenOptions} from './screenOptions';
import {themeStyles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useFilters} from './hooks';
import {TestIDs} from 'core/types';
import {composeTestID} from 'core/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const Filters = () => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('filters');
  const {
    caregoriesData,
    googleRatings,
    regions,
    activeRating,
    activeRegions,
    activeCategories,
    emptyActiveFilters,
    getFiltersData,
    updateRatings,
    chooseCategory,
    chooseRegion,
    clearFilters,
    fullScreenLoading,
    liltersDataLoading,
    errorTexts,
    total,
    regionsWithNumberOfItems,
    categoriesWithNumberOfItems,
  } = useFilters();
  const {bottom} = useSafeAreaInsets();

  const buttons = useMemo(() => {
    return [
      {
        onPress: clearFilters,
        theme: 'secondary' as const,
        text: t('clear'),
        disabled: emptyActiveFilters,
        testID: composeTestID(TestIDs.FilterButton, 'clearButton'),
      },
      {
        onPress: () => {},
        theme: 'primary' as const,
        text: t('showFiltered', {amount: total}),
        loading: liltersDataLoading,
        testID: composeTestID(TestIDs.FilterButton, 'showFiltered'),
      },
    ];
  }, [t, total, clearFilters, liltersDataLoading, emptyActiveFilters]);

  return (
    <View style={styles.container}>
      <SuspenseView
        loading={fullScreenLoading}
        error={errorTexts}
        retryCallback={getFiltersData}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{t('title')}</Text>
          <FiltersSectionContainer itemName={t('allCategories')}>
            <View style={styles.categoryList}>
              {caregoriesData?.map(category => (
                <Chip
                  active={activeCategories?.includes(category.id)}
                  disabled={categoriesWithNumberOfItems[category.id] === 0}
                  onPress={() => chooseCategory(category.id)}
                  key={category.id}
                  testID={category.name}
                  text={category.name}
                  style={styles.chipContainer}
                />
              ))}
            </View>
          </FiltersSectionContainer>
          <FiltersSectionContainer itemName={t('whereToLook')}>
            <Text style={styles.subFilterName}>{t('regions')}</Text>
            <View style={styles.categoryList}>
              {regions?.map(region => (
                <Chip
                  key={region.id}
                  active={activeRegions?.includes(region.id)}
                  disabled={regionsWithNumberOfItems[region.id] === 0}
                  testID={region.id}
                  onPress={() => chooseRegion(region.id)}
                  text={region.value}
                  style={styles.chipContainer}
                />
              ))}
            </View>
            <FiltersSectionContainer isSubSection itemName={t('settlements')}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.settlementsContainer}>
                <Text style={styles.settlementsLabel}>{t('any')}</Text>
                <Icon
                  name="chevronMediumRight"
                  size={24}
                  style={styles.settlementsLabel}
                />
              </TouchableOpacity>
            </FiltersSectionContainer>
            <FiltersSectionContainer isSubSection itemName={t('geolocation')}>
              <Button
                text={t('choose')}
                theme="quarterly"
                testID={TestIDs.FiltersChooseButton}
                style={styles.chooseButtonContainer}
                labelAnimatedStyle={styles.chooseButtonLabel}
                icon={textStyle => (
                  <Icon name="marker" size={20} style={textStyle} />
                )}
              />
            </FiltersSectionContainer>
            <FiltersSectionContainer
              isSubSection
              itemName={t('considerDistance')}>
              <Switch />
            </FiltersSectionContainer>
          </FiltersSectionContainer>
          <FiltersSectionContainer itemName={t('ratingGoogle')}>
            <Multiswitch
              activeItemKey={activeRating}
              items={googleRatings}
              defaultValue={{key: 'Any', label: t('any')}}
              onItemPress={updateRatings}
              testID={TestIDs.FiltersMultySwitch}
            />
          </FiltersSectionContainer>
          <FiltersSectionContainer
            isSubSection
            itemName={t('hideVisit')}
            style={styles.hideVisitContainer}>
            <Switch />
          </FiltersSectionContainer>
          <ButtonsGroup
            buttons={buttons}
            bottomInset={bottom}
            containerStyle={styles.buttonsGroupContainer}
          />
        </ScrollView>
      </SuspenseView>
    </View>
  );
};

Filters.screenOptions = screenOptions;
