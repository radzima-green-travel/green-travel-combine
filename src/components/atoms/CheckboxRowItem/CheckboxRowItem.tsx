import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Checkbox} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {SpotItemDTO, TestIDs} from 'core/types';
import {themeStyles} from './styles';
import {composeTestID} from 'core/helpers';

export const CheckboxRowItem = memo(
  ({
    item,
    isSelected,
    onPress,
  }: {
    item: SpotItemDTO;
    isSelected: boolean;
    onPress: (id: string) => void;
  }) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <TouchableOpacity
        style={styles.sectionItemContainer}
        onPress={() => onPress(item.id)}
        testID={composeTestID(TestIDs.SettlementSectionListItem, item.value)}>
        <Checkbox
          selected={isSelected}
          testID={composeTestID(
            TestIDs.SettlementSectionListItemCheckbox,
            item.value,
          )}
        />
        <Text style={styles.sectionItemText}>{item.value}</Text>
      </TouchableOpacity>
    );
  },
);
