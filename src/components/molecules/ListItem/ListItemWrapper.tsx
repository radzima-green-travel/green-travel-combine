import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {ListItemWrapperProps} from './types';
import {themeStyles} from './styles';

export const ListItemWrapper = memo(
  ({
    testID,
    children,
    onPress,
    disabled,
    containerStyle,
  }: ListItemWrapperProps) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <TouchableOpacity
        testID={testID}
        activeOpacity={0.8}
        onPress={onPress}
        disabled={!onPress || disabled}
        style={[styles.container, containerStyle]}>
        {children}
      </TouchableOpacity>
    );
  },
);
