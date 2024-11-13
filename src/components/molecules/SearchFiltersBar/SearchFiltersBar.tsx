import React, {memo} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {Chip} from 'atoms';
import {SearchFiltersItem} from 'core/types';
import {composeTestID} from 'core/helpers';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

interface SearchFiltersProps {
  filters: SearchFiltersItem[];
  testID: string;
  onFilterPress: (id: string) => void;
}

export const SearchFiltersBar = memo(
  ({filters, testID, onFilterPress}: SearchFiltersProps) => {
    const styles = useThemeStyles(themeStyles);
    const renderItem: ListRenderItem<SearchFiltersItem> = ({item}) => {
      const {id, value, icon} = item;
      return (
        <Chip
          style={styles.itemContainer}
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
      <FlatList
        style={styles.listContainer}
        keyExtractor={({id}) => id}
        horizontal
        data={filters}
        renderItem={renderItem}
      />
    );
  },
);
