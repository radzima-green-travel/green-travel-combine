import React, {useMemo, useCallback} from 'react';
import {Text, View} from 'react-native';
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
    paginationProps,
    settlementsSections,
    activeSettlements,
    selectedSettlements,
    chooseSettlement,
    applySettlements,
  } = useSettlements();

  const renderItem = useCallback(
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

  const renderHeader = useCallback(
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

  return (
    <View style={styles.container}>
      <SuspenseView>
        <ScreenContent>
          <SearchBar onChange={() => {}} value="" />
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={settlementsSections}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderHeader}
            {...paginationProps}
          />
          <Button
            text={
              selectedSettlements.length > 1
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
