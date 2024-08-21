import {useThemeStyles} from 'core/hooks';
import React, {memo, useCallback} from 'react';
import {Text, Pressable} from 'react-native';
import {Icon} from '../Icon';
import {themeStyles} from './styles';
import {iconsConfig} from './config';
import {IMapFilter} from 'core/types';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  data: IMapFilter;
  isSelected: boolean;
  onSelect: (filter: IMapFilter) => void;
  testID: string;
}

export const MapFilterItem = memo(
  ({isSelected, data, onSelect, testID}: IProps) => {
    const {title, icon} = data;
    const styles = useThemeStyles(themeStyles);
    const iconProps = iconsConfig[icon];
    const onSelectHandler = useCallback(() => {
      onSelect(data);
    }, [data, onSelect]);

    return (
      <Pressable
        onPress={onSelectHandler}
        {...getPlatformsTestID(testID)}
        style={[styles.container, isSelected && styles.selectedContainer]}>
        <Icon
          {...iconProps}
          testID={composeTestID(testID, 'filterIcon')}
          style={[styles.icon, isSelected && styles.selectedIcon]}
        />
        <Text style={[styles.text, isSelected && styles.selectedText]}>
          {title}
        </Text>
      </Pressable>
    );
  },
);
