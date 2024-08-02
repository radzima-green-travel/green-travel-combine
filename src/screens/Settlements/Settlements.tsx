import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {SuspenseView, Button, ScreenContent, Checkbox, SnackBar} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {TestIDs} from 'core/types';
import {screenOptions} from './screenOptions';
import {themeStyles, ITEM_HEIGHT} from './styles';
import {SectionList} from 'react-native';
import {SearchBar} from 'molecules';
import {useSettlements} from './hooks';
import {COLORS} from 'assets';
import {composeTestID} from 'core/helpers';

const getItemLayout = (_, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

export const Settlements = () => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('filters');

  const {
    navigation,
    paginationProps,
    settlementsSections,
    activeSettlements,
    selectedSettlements,
    fullScreenLoading,
    searchLoading,
    searchValue,
    errorTexts,
    snackBarProps,
    handleSearchValue,
    chooseSettlement,
    applySettlements,
    getSettlementsData,
    resetSelectedSettlements,
  } = useSettlements();

  const renderSectionItem = useCallback(
    ({item}) => (
      <View
        style={styles.sectionItemContainer}
        testID={composeTestID(TestIDs.SettlementSectionListItem, item.value)}>
        <Checkbox
          selected={selectedSettlements?.includes(item.id)}
          onPress={() => chooseSettlement(item.id)}
          testID={composeTestID(
            TestIDs.SettlementSectionListItemCheckbox,
            item.value,
          )}
        />
        <Text style={styles.sectionItemText}>{item.value}</Text>
      </View>
    ),
    [
      styles.sectionItemContainer,
      styles.sectionItemText,
      selectedSettlements,
      chooseSettlement,
    ],
  );

  const renderSectionHeader = useCallback(
    ({section: {title}}) => (
      <View style={styles.sectionHeaderWrapper}>
        <View
          style={styles.sectionHeaderContainer}
          testID={composeTestID(TestIDs.SettlementSectionListHeader, title)}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      </View>
    ),
    [
      styles.sectionHeaderContainer,
      styles.sectionHeaderText,
      styles.sectionHeaderWrapper,
    ],
  );

  const renderHeaderRight = useCallback(
    () =>
      selectedSettlements.length ? (
        <TouchableOpacity
          onPress={resetSelectedSettlements}
          testID={TestIDs.HeaderResetButton}>
          <Text style={styles.resetButtonText}>{t('settlements.reset')}</Text>
        </TouchableOpacity>
      ) : null,
    [styles.resetButtonText, t, selectedSettlements, resetSelectedSettlements],
  );

  const renderListEmptyComponent = useCallback(
    () => (
      <View style={styles.listEmptyContainer} testID={TestIDs.NotFound}>
        <Text style={styles.listEmptyText}>
          {t('settlements.nothingFound')}
        </Text>
      </View>
    ),
    [styles.listEmptyContainer, styles.listEmptyText, t],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  return (
    <View style={styles.container}>
      <SuspenseView
        loading={fullScreenLoading}
        error={errorTexts}
        retryCallback={getSettlementsData}>
        <ScreenContent>
          <SearchBar onChange={handleSearchValue} value={searchValue} />
          {searchLoading ? (
            <View style={styles.listEmptyContainer}>
              <ActivityIndicator color={COLORS.forestGreen} />
            </View>
          ) : (
            <>
              <SectionList
                contentContainerStyle={styles.sectionListContentContainer}
                showsVerticalScrollIndicator={false}
                sections={settlementsSections}
                keyExtractor={item => item.id}
                getItemLayout={getItemLayout}
                renderItem={renderSectionItem}
                ListEmptyComponent={renderListEmptyComponent}
                renderSectionHeader={renderSectionHeader}
                {...paginationProps}
                initialNumToRender={15}
                maxToRenderPerBatch={15}
              />
            </>
          )}
          <Button
            text={
              selectedSettlements.length
                ? t('settlements.applySeveral', {
                    amount: selectedSettlements.length,
                  })
                : t('settlements.apply')
            }
            textStyle={styles.button}
            testID={TestIDs.ApplyButton}
            disabled={!selectedSettlements.length && !activeSettlements.length}
            onPress={applySettlements}
          />
          <SnackBar isOnTop {...snackBarProps} />
        </ScreenContent>
      </SuspenseView>
    </View>
  );
};

Settlements.screenOptions = screenOptions;
