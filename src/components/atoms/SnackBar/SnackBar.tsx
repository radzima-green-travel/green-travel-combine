import React, {memo, forwardRef, ComponentProps, useMemo} from 'react';
import {View, Text} from 'react-native';

import {themeStyles} from './styles';
import {SnackBarContainer, SnackBarContainerRef} from './SnackBarContainer';

import {useThemeStyles} from 'core/hooks';
import {Icon} from '../Icon';

export interface SnackBarProps {
  isOnTop?: boolean;
  title?: string;
  type?: 'positive' | 'error';
  iconProps?: ComponentProps<typeof Icon>;
  timeoutMs?: number;
}

export const SnackBar = memo(
  forwardRef<SnackBarContainerRef, SnackBarProps>(
    (
      {title = '', isOnTop = false, iconProps, type = 'error', timeoutMs},
      ref,
    ) => {
      const styles = useThemeStyles(themeStyles);

      const typeSpecificStyles = useMemo(() => {
        return {
          container: styles[`${type}Container`],
          text: styles[`${type}Text`],
        };
      }, [styles, type]);

      return (
        <SnackBarContainer isOnTop={isOnTop} ref={ref} timeoutMs={timeoutMs}>
          <View style={[styles.container, typeSpecificStyles.container]}>
            <Text style={[styles.text, typeSpecificStyles.text]}>{title}</Text>
            {iconProps ? <Icon style={styles.icon} {...iconProps} /> : null}
          </View>
        </SnackBarContainer>
      );
    },
  ),
);
