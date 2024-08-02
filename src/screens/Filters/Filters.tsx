import React, {useMemo} from 'react';
import {Text, View, Switch, TouchableOpacity} from 'react-native';
import {Chip, Multiswitch, SuspenseView, Button, Icon, SnackBar} from 'atoms';
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
    getFiltersInitialData,
    updateRatings,
    chooseCategory,
    chooseRegion,
    clearFilters,
    fullScreenLoading,
    filtersDataLoading,
    errorTexts,
    total,
    regionsWithNumberOfItems,
    categoriesWithNumberOfItems,
    snackBarProps,
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
        loading: filtersDataLoading,
        testID: composeTestID(TestIDs.FilterButton, 'showFiltered'),
      },
    ];
  }, [t, total, clearFilters, filtersDataLoading, emptyActiveFilters]);

  return (
    <View style={styles.container}>
      <SuspenseView
        loading={fullScreenLoading}
        error={errorTexts}
        retryCallback={getFiltersInitialData}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{t('title')}</Text>
          <FiltersSectionContainer itemName={t('allCategories')}>
            <View style={styles.categoryList}>
              {caregoriesData?.map(({id, name}) => (
                <Chip
                  active={activeCategories?.includes(id)}
                  disabled={categoriesWithNumberOfItems[id] === 0}
                  onPress={() => chooseCategory(id)}
                  key={id}
                  testID={name}
                  text={name}
                  style={styles.chipContainer}
                />
              ))}
            </View>
          </FiltersSectionContainer>
          <FiltersSectionContainer itemName={t('whereToLook')}>
            <Text style={styles.subFilterName}>{t('regions')}</Text>
            <View style={styles.categoryList}>
              {regions?.map(({id, value}) => (
                <Chip
                  active={activeRegions?.includes(id)}
                  disabled={regionsWithNumberOfItems[id] === 0}
                  onPress={() => chooseRegion(id)}
                  key={id}
                  testID={value}
                  text={value}
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
              activeItemId={activeRating}
              items={googleRatings}
              defaultValue={{id: 'Any', value: t('any')}}
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
        <SnackBar isOnTop {...snackBarProps} />
      </SuspenseView>
    </View>
  );
};

Filters.screenOptions = screenOptions;
