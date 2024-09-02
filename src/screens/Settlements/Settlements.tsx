import React, {useCallback, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {HighlightedText, SnackBar, SuspenseView} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {screenOptions} from './screenOptions';
import {themeStyles, ITEM_HEIGHT} from './styles';
import {SectionList} from 'react-native';
import {ButtonsGroup, SearchField} from 'molecules';
import {useSettlements} from './hooks';
import {getPlatformsTestID} from 'core/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ListItem} from 'molecules/ListItem';

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
    loading,
    snackBarProps,
  } = useSettlements();

  const {bottom} = useSafeAreaInsets();

  const renderSectionHeader = useCallback(
    ({section: {title}}) => (
      <View style={styles.sectionHeaderWrapper}>
        <View
          style={styles.sectionHeaderContainer}
          {...getPlatformsTestID('sectionHeader')}>
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
          {...getPlatformsTestID('headerResetButton')}>
          <Text style={styles.resetButtonText}>{t('settlements.reset')}</Text>
        </TouchableOpacity>
      ) : null,
    [styles.resetButtonText, t, selectedSettlements, resetSelectedSettlements],
  );

  const renderListEmptyComponent = useCallback(
    () => (
      <View
        style={styles.listEmptyContainer}
        {...getPlatformsTestID('emptyView')}>
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={24}
      style={styles.container}>
      <SearchField
        testID={'searchField'}
        onChange={handleSearchValue}
        value={searchValue}
      />
      <SuspenseView
        testID="suspenseView"
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
            <ListItem
              type={'checkbox'}
              item={item}
              key={item.id}
              checked={selectedSettlements.includes(item.id)}
              onPress={chooseSettlement}
              testID={'settlementsListItem'}
              header={<HighlightedText text={item.value} query={searchValue} />}
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
              testID: 'applyButton',
              disabled: isApplyButtonDisabled,
              loading,
              onPress: applySettlements,
            },
          ]}
        />
      </SuspenseView>
      <SnackBar isOnTop testID="snackBar" {...snackBarProps} />
    </KeyboardAvoidingView>
  );
};

Settlements.screenOptions = screenOptions;
