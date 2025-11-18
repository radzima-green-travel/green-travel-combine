import React, {useEffect, useMemo} from 'react';
import {Text, View} from 'react-native';
import {Chip, Multiswitch, SnackBar} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {
  ButtonsGroup,
  FiltersSectionContainer,
  ListItem,
  SuspenseView,
  FilterDistance,
} from 'molecules';
import {themeStyles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useFilters} from './hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from 'services/PlatformService';
import {Header} from 'containers';

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
    clearFiltersPress,
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
        onPress: clearFiltersPress,
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
    clearFiltersPress,
    t,
    styles.button,
    total,
    filtersDataLoading,
    applyFilters,
  ]);

  return (
    <>
      <Header overlaysContent={false} statusbarStyle={isIOS ? 'light' : 'auto'}>
        {({navigation}) => (
          <Header.RightBlock>
            <Header.ActionButton
              icon="close"
              onPress={navigation.goBack}
              testID="closeButton"
              size="small"
            />
          </Header.RightBlock>
        )}
      </Header>
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
                  {caregoriesData?.map(item => (
                    <Chip
                      item={item}
                      active={activeFilters.categories?.includes(item.id)}
                      onPress={chooseCategory}
                      key={item.id}
                      disabled={getIsCategoryDisabled(item.id)}
                      testID={'categoeyChipItem'}
                      text={item.name}
                      style={styles.chipContainer}
                    />
                  ))}
                </View>
              </FiltersSectionContainer>
              <FiltersSectionContainer itemName={t('whereToLook')}>
                <Text style={styles.subFilterName}>{t('regions')}</Text>
                <View style={styles.categoryList}>
                  {regions?.map(item => (
                    <Chip
                      item={item}
                      active={activeFilters.regions?.includes(item.id)}
                      onPress={chooseRegion}
                      disabled={getIsRegionDisabled(item.id)}
                      key={item.id}
                      testID={'regionChipItem'}
                      text={item.value}
                      style={styles.chipContainer}
                    />
                  ))}
                </View>
                <ListItem
                  testID="settlements"
                  type="primary"
                  title={t('settlements.title')}
                  boldTitle
                  containerStyle={styles.settlementsContainer}
                  onPress={navigateToSettlements}
                  tailIcon="chevronMediumRight"
                  {...(activeFilters.municipalities.length
                    ? {
                        label: String(activeFilters.municipalities.length),
                        labelContainerStyle:
                          styles.activeSettlementsLabelContainer,
                        labelStyle: styles.activeSettlementsLabel,
                      }
                    : {
                        label: t('any'),
                      })}
                />
                <FilterDistance
                  distance={activeFilters.distance.value}
                  isOn={activeFilters.distance.isOn}
                  location={activeFilters.distance.location}
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
                boldTitle
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
    </>
  );
};
