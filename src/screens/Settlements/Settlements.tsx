import React, {useCallback, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  SuspenseView,
  Button,
  ScreenContent,
  SnackBar,
  SectionSettlementItem,
} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {TestIDs} from 'core/types';
import {screenOptions} from './screenOptions';
import {themeStyles, ITEM_HEIGHT} from './styles';
import {SectionList} from 'react-native';
import {SearchBar} from 'molecules';
import {useSettlements} from './hooks';
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
    searchValue,
    errorTexts,
    snackBarProps,
    handleSearchValue,
    chooseSettlement,
    applySettlements,
    getSettlementsData,
    resetSelectedSettlements,
  } = useSettlements();

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
      <ScreenContent>
        <SearchBar onChange={handleSearchValue} value={searchValue} />
        <SuspenseView
          loading={fullScreenLoading}
          error={errorTexts}
          retryCallback={getSettlementsData}>
          <SectionList
            contentContainerStyle={styles.sectionListContentContainer}
            showsVerticalScrollIndicator={false}
            sections={settlementsSections}
            keyExtractor={item => item.id}
            getItemLayout={getItemLayout}
            renderItem={({item}) => (
              <SectionSettlementItem
                item={item}
                selectedSettlements={selectedSettlements}
                chooseSettlement={chooseSettlement}
              />
            )}
            ListEmptyComponent={renderListEmptyComponent}
            renderSectionHeader={renderSectionHeader}
            {...paginationProps}
            initialNumToRender={15}
            maxToRenderPerBatch={15}
          />
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
        </SuspenseView>
        <SnackBar isOnTop {...snackBarProps} />
      </ScreenContent>
    </View>
  );
};

Settlements.screenOptions = screenOptions;
