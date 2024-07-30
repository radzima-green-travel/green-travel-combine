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
    retryToGetInitialFiltersData,
    updateRatings,
    chooseCategory,
    chooseRegion,
    clearFilters,
    navigateToSettlements,
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
      ...(!emptyActiveFilters
        ? [
            {
              onPress: clearFilters,
              theme: 'secondary' as const,
              text: t('clear'),
              textStyle: styles.button,
              testID: composeTestID(TestIDs.FilterButton, 'clearButton'),
            },
          ]
        : []),
      {
        onPress: () => {},
        theme: 'primary' as const,
        textStyle: styles.button,
        text: t(emptyActiveFilters ? 'showAll' : 'showFiltered', {
          amount: total,
        }),
        loading: filtersDataLoading,
        testID: composeTestID(TestIDs.FilterButton, 'showFiltered'),
      },
    ];
  }, [
    emptyActiveFilters,
    clearFilters,
    t,
    styles.button,
    total,
    filtersDataLoading,
  ]);

  return (
    <View style={styles.container}>
      <SuspenseView
        loading={fullScreenLoading}
        error={errorTexts}
        retryCallback={retryToGetInitialFiltersData}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{t('title')}</Text>
          <FiltersSectionContainer itemName={t('allCategories')}>
            <View style={styles.categoryList}>
              {caregoriesData?.map(({categoryId, title}) => (
                <Chip
                  active={activeCategories?.includes(categoryId)}
                  disabled={categoriesWithNumberOfItems[categoryId] === 0}
                  onPress={() => chooseCategory(categoryId)}
                  key={categoryId}
                  testID={title}
                  text={title}
                  style={styles.chipContainer}
                />
              ))}
            </View>
          </FiltersSectionContainer>
          <FiltersSectionContainer itemName={t('whereToLook')}>
            <Text style={styles.subFilterName}>{t('regions')}</Text>
            <View style={styles.categoryList}>
              {regions?.map(({regionId, title}) => (
                <Chip
                  active={activeRegions?.includes(regionId)}
                  disabled={regionsWithNumberOfItems[regionId] === 0}
                  onPress={() => chooseRegion(regionId)}
                  key={regionId}
                  testID={title}
                  text={title}
                  style={styles.chipContainer}
                />
              ))}
            </View>
            <FiltersSectionContainer
              isSubSection
              itemName={t('settlements.title')}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.settlementsContainer}
                onPress={navigateToSettlements}>
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
