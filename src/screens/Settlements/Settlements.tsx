import React, {useCallback, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SuspenseView} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {TestIDs} from 'core/types';
import {screenOptions} from './screenOptions';
import {themeStyles, ITEM_HEIGHT} from './styles';
import {SectionList} from 'react-native';
import {ButtonsGroup, SearchField} from 'molecules';
import {useSettlements} from './hooks';
import {composeTestID} from 'core/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ListItemCheckbox} from 'molecules/ListItem';

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
    settlementsSections,
    selectedSettlements,
    fullScreenLoading,
    searchValue,
    errorTexts,
    handleSearchValue,
    chooseSettlement,
    applySettlements,
    getSettlementsData,
    resetSelectedSettlements,
    isApplyButtonDisabled,
  } = useSettlements();

  const {bottom} = useSafeAreaInsets();

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
      <SearchField
        testID={TestIDs.SearchBar}
        onChange={handleSearchValue}
        value={searchValue}
      />
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
            <ListItemCheckbox
              item={item}
              key={item.id}
              title={item.value}
              checked={selectedSettlements.includes(item.id)}
              onPress={chooseSettlement}
              testID={TestIDs.SettlementSectionListItem}
            />
          )}
          ListEmptyComponent={renderListEmptyComponent}
          renderSectionHeader={renderSectionHeader}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
        />
        <ButtonsGroup
          bottomInset={bottom}
          buttons={[
            {
              text: selectedSettlements.length
                ? t('settlements.applySeveral', {
                    amount: selectedSettlements.length,
                  })
                : t('settlements.apply'),
              testID: TestIDs.ApplyButton,
              disabled: isApplyButtonDisabled,
              onPress: applySettlements,
            },
          ]}
        />
      </SuspenseView>
    </View>
  );
};

Settlements.screenOptions = screenOptions;
