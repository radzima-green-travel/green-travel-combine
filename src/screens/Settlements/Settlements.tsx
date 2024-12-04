import React, {useCallback, useEffect, useMemo} from 'react';
import {Text, TouchableOpacity, View, KeyboardAvoidingView} from 'react-native';
import {Chip, HighlightedText, SnackBar} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {screenOptions} from './screenOptions';
import {themeStyles} from './styles';
import {SectionList} from 'react-native';
import {
  ButtonsGroup,
  FiltersSectionContainer,
  SearchField,
  SuspenseView,
} from 'molecules';
import {useSettlements} from './hooks';
import {getPlatformsTestID} from 'core/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ListItem} from 'molecules/ListItem';
import {every} from 'lodash';

export const Settlements = () => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('filters');

  const {
    navigation,
    settlementsSections,
    selectedSettlementsSection,
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
    clearInput,
    filteredSettlements,
    onSearchStart,
  } = useSettlements();

  const {bottom, top} = useSafeAreaInsets();

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

  const SelectedSettlementsSection = useMemo(() => {
    return selectedSettlementsSection.length ? (
      <FiltersSectionContainer itemName={t('selected')}>
        <View style={styles.categoryList}>
          {selectedSettlementsSection?.map(item => {
            const notInTheList = every(
              filteredSettlements,
              ({id}) => id !== item.id,
            );

            return (
              <Chip
                active={true}
                item={item}
                onPress={chooseSettlement}
                key={item.id}
                testID={'settlementsListItem'}
                text={item.value}
                style={[
                  styles.chipContainer,
                  notInTheList && styles.secondaryChip,
                ]}
              />
            );
          })}
        </View>
      </FiltersSectionContainer>
    ) : null;
  }, [
    chooseSettlement,
    filteredSettlements,
    selectedSettlementsSection,
    styles.categoryList,
    styles.chipContainer,
    styles.secondaryChip,
    t,
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  return (
    <View style={styles.container}>
      <SearchField
        testID={'searchField'}
        onChange={handleSearchValue}
        value={searchValue}
        onRightButtonPress={clearInput}
        onFocus={onSearchStart}
      />
      <SuspenseView
        testID="suspenseView"
        loading={fullScreenLoading}
        error={errorTexts}
        retryCallback={getSettlementsData}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={'padding'}
          keyboardVerticalOffset={top + 50}>
          <SectionList
            ListHeaderComponent={SelectedSettlementsSection}
            contentContainerStyle={styles.sectionListContentContainer}
            showsVerticalScrollIndicator={false}
            sections={settlementsSections}
            keyExtractor={item => item.id}
            stickySectionHeadersEnabled={false}
            renderItem={({item}) => (
              <ListItem
                type={'checkbox'}
                item={item}
                key={item.id}
                title={item.value}
                checked={selectedSettlements.includes(item.id)}
                onPress={chooseSettlement}
                testID={'settlementsListItem'}
                renderTitle={props => {
                  return <HighlightedText {...props} query={searchValue} />;
                }}
              />
            )}
            ListEmptyComponent={renderListEmptyComponent}
            renderSectionHeader={renderSectionHeader}
            initialNumToRender={30}
            maxToRenderPerBatch={15}
          />
        </KeyboardAvoidingView>

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
    </View>
  );
};

Settlements.screenOptions = screenOptions;
