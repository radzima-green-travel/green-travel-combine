import React, {memo, useMemo} from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
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
    position,
  }: ListItemWrapperProps) => {
    const styles = useThemeStyles(themeStyles);

    const containerStyles = useMemo(() => {
      const style = [styles.container];

      if (position === 'top' || position === 'middle') {
        style.push(styles.topContainer);
      }

      if (position === 'bottom' || position === 'middle') {
        style.push(styles.bottomContainer);
      }

      if (containerStyle) {
        style.push(containerStyle as ViewStyle);
      }

      return style;
    }, [containerStyle, position, styles]);

    return (
      <TouchableOpacity
        testID={testID}
        activeOpacity={0.8}
        onPress={onPress}
        disabled={!onPress || disabled}
        style={containerStyles}>
        {children}
      </TouchableOpacity>
    );
  },
);
