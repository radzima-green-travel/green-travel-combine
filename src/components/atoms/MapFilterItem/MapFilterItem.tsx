import {useThemeStyles} from 'core/hooks';
import React, {memo, useCallback} from 'react';
import {Text, Pressable} from 'react-native';
import {Icon} from '../Icon';
import {themeStyles} from './styles';
import {iconsConfig} from './config';
import {IMapFilter} from 'core/types';

interface IProps {
  data: IMapFilter;
  isSelected: boolean;
  onSelect: (filter: IMapFilter) => void;
}

export const MapFilterItem = memo(({isSelected, data, onSelect}: IProps) => {
  const {title, icon} = data;
  const styles = useThemeStyles(themeStyles);
  const iconProps = iconsConfig[icon];
  const onSelectHandler = useCallback(() => {
    onSelect(data);
  }, [data, onSelect]);

  return (
    <Pressable
      onPress={onSelectHandler}
      style={[styles.container, isSelected && styles.selectedContainer]}>
      <Icon
        {...iconProps}
        style={[styles.icon, isSelected && styles.selectedIcon]}
      />
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {title}
      </Text>
    </Pressable>
  );
});
