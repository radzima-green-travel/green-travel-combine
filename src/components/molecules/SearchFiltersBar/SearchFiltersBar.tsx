import React, {memo} from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {Chip} from 'atoms';
import {SearchFiltersItem} from 'core/types';
import {composeTestID} from 'core/helpers';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

interface SearchFiltersProps {
  filters: SearchFiltersItem[];
  testID: string;
  onFilterPress: (id: string) => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const SearchFiltersBar = memo(
  ({
    filters,
    testID,
    onFilterPress,
    style,
    contentContainerStyle,
  }: SearchFiltersProps) => {
    const styles = useThemeStyles(themeStyles);

    const renderItem = (item: SearchFiltersItem) => {
      const {id, value, icon} = item;

      return (
        <Chip
          key={id}
          leftIcon={icon}
          testID={composeTestID(testID, 'item')}
          text={value}
          isShowCloseIcon
          onClosePress={() => onFilterPress(id)}
        />
      );
    };

    return (
      <ScrollView
        testID={testID}
        style={style}
        contentContainerStyle={[styles.listContainer, contentContainerStyle]}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {filters.map(renderItem)}
      </ScrollView>
    );
  },
);
