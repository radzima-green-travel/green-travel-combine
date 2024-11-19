import React, {useEffect, useMemo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Chip, Multiswitch, SuspenseView, Icon, SnackBar} from 'atoms';
import {
  useColorScheme,
  useStatusBar,
  useThemeStyles,
  useTranslation,
} from 'core/hooks';
import {ButtonsGroup, FiltersSectionContainer, ListItem} from 'molecules';
import {screenOptions} from './screenOptions';
import {themeStyles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useFilters} from './hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FilterDistance} from 'components/molecules';
import {isIOS} from 'services/PlatformService';

export const Filters = () => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('filters');
  const {
    caregoriesData,
    googleRatings,
    regions,
    emptyActiveFilters,
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
    getIsRegionDisabled,
    updateDistanceIsOn,
    updateDistance,
    applyFilters,
    getFiltersData,
    onExcludeVisitedPress,
    activeFilters,
    getIsCategoryDisabled,
  } = useFilters();
  const {bottom} = useSafeAreaInsets();

  const scheme = useColorScheme();

  useStatusBar(scheme, {disabled: isIOS});

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
        onPress: applyFilters,
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
    applyFilters,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SuspenseView
          loading={fullScreenLoading}
          error={errorTexts}
          retryCallback={getFiltersData}
          testID={'filtersSuspenseView'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{t('title')}</Text>
            <FiltersSectionContainer itemName={t('allCategories')}>
              <View style={styles.categoryList}>
                {caregoriesData?.map(({id, name}) => (
                  <Chip
                    active={activeFilters.categories?.includes(id)}
                    onPress={() => chooseCategory(id)}
                    key={id}
                    disabled={getIsCategoryDisabled(id)}
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
                    active={activeFilters.regions?.includes(id)}
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
                  {activeFilters.municipalities.length ? (
                    <View style={styles.activeSettlementsLabelContainer}>
                      <Text style={styles.activeSettlementsLabel}>
                        {activeFilters.municipalities.length}
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
              <FilterDistance
                distance={activeFilters.distance.value}
                isOn={activeFilters.distance.isOn}
                onChangeSwitcherState={updateDistanceIsOn}
                onChangeDistance={updateDistance}
              />
            </FiltersSectionContainer>
            <FiltersSectionContainer itemName={t('ratingGoogle')}>
              <Multiswitch
                activeItemId={activeFilters.googleRating}
                items={googleRatings}
                defaultValue={{id: 'Any', value: t('any'), disabled: false}}
                onItemPress={updateRatings}
                testID={'googleRating'}
              />
            </FiltersSectionContainer>
            <ListItem
              type="switch"
              title={t('hideVisit')}
              testID={'hideVisit'}
              switchProps={{
                value: activeFilters.excludeVisited,
                onValueChange: onExcludeVisitedPress,
              }}
            />
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
