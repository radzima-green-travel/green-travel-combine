/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useMemo} from 'react';
import {Text, View, Switch, TouchableOpacity} from 'react-native';
import {Chip, Multiswitch, SuspenseView, Button, Icon, SnackBar} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {ButtonsGroup, FiltersSectionContainer} from 'molecules';
import {screenOptions} from './screenOptions';
import {themeStyles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useFilters} from './hooks';
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
    navigateToSettlements,
    fullScreenLoading,
    filtersDataLoading,
    errorTexts,
    total,
    snackBarProps,
    activeSettlements,
    getIsRegionDisabled,
  } = useFilters();
  const {bottom} = useSafeAreaInsets();

  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, [clearFilters]);

  const buttons = useMemo(() => {
    return [
      {
        onPress: clearFilters,
        theme: 'secondary' as const,
        text: t('clear'),
        textStyle: styles.button,
        disabled: emptyActiveFilters,
        testID: 'clearButton',
      },
      {
        onPress: () => {},
        theme: 'primary' as const,
        textStyle: styles.button,
        text: t('showFiltered', {amount: total}),
        loading: filtersDataLoading,
        testID: 'showFiltered',
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
      <View style={styles.content}>
        <SuspenseView
          loading={fullScreenLoading}
          error={errorTexts}
          retryCallback={getFiltersInitialData}
          testID={'filtersSuspenseView'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{t('title')}</Text>
            <FiltersSectionContainer itemName={t('allCategories')}>
              <View style={styles.categoryList}>
                {caregoriesData?.map(({id, name}) => (
                  <Chip
                    active={activeCategories?.includes(id)}
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
                    onPress={() => chooseRegion(id)}
                    disabled={getIsRegionDisabled(id)}
                    key={id}
                    testID={value}
                    text={value}
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
                  {activeSettlements.length ? (
                    <View style={styles.activeSettlementsLabelContainer}>
                      <Text style={styles.activeSettlementsLabel}>
                        {activeSettlements.length}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.settlementsLabel}>{t('any')}</Text>
                  )}
                  <Icon
                    name="chevronMediumRight"
                    size={24}
                    style={[
                      styles.settlementsLabel,
                      styles.settlementsLabelIcon,
                    ]}
                  />
                </TouchableOpacity>
              </FiltersSectionContainer>
              <FiltersSectionContainer isSubSection itemName={t('geolocation')}>
                <Button
                  text={t('choose')}
                  theme="quarterly"
                  testID={'chooseButton'}
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
                testID={'googleRating'}
              />
            </FiltersSectionContainer>
            <FiltersSectionContainer
              isSubSection
              itemName={t('hideVisit')}
              style={styles.hideVisitContainer}>
              <Switch />
            </FiltersSectionContainer>
          </ScrollView>
          <SnackBar testID="snackBar" isOnTop {...snackBarProps} />
        </SuspenseView>
      </View>

      <ButtonsGroup
        buttons={buttons}
        bottomInset={bottom}
        containerStyle={styles.buttonsGroupContainer}
      />
    </View>
  );
};

Filters.screenOptions = screenOptions;
