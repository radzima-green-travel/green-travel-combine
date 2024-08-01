import React, {useCallback, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SuspenseView, Button, ScreenContent, Checkbox} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {TestIDs} from 'core/types';
import {screenOptions} from './screenOptions';
import {themeStyles} from './styles';
import {SectionList} from 'react-native';
import {SearchBar} from 'molecules';
import {useSettlements} from './hooks';

export const Settlements = () => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('filters');

  const {
    navigation,
    paginationProps,
    settlementsSections,
    activeSettlements,
    selectedSettlements,
    chooseSettlement,
    applySettlements,
    resetSelectedSettlements,
  } = useSettlements();

  const renderSectionItem = useCallback(
    ({item}) => (
      <View style={styles.sectionItemContainer}>
        <Checkbox
          selected={selectedSettlements?.includes(item.id)}
          onPress={() => chooseSettlement(item.id)}
          testID={item.value}
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
        <View style={styles.sectionHeaderContainer}>
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
        <TouchableOpacity onPress={resetSelectedSettlements}>
          <Text style={styles.resetButtonText}>{t('settlements.reset')}</Text>
        </TouchableOpacity>
      ) : null,
    [styles.resetButtonText, t, selectedSettlements, resetSelectedSettlements],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  return (
    <View style={styles.container}>
      <SuspenseView>
        <ScreenContent>
          <SearchBar onChange={() => {}} value="" />
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={settlementsSections}
            keyExtractor={item => item.id}
            renderItem={renderSectionItem}
            renderSectionHeader={renderSectionHeader}
            {...paginationProps}
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
        </ScreenContent>
      </SuspenseView>
    </View>
  );
};

Settlements.screenOptions = screenOptions;
