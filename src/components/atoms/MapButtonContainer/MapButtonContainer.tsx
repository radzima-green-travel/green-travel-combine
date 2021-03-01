import {useThemeStyles} from 'core/hooks';
import React, {memo, PropsWithChildren} from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import {themeStyles} from './styles';

interface IProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const MapButtonContainer = memo(
  ({children, style, onPress}: PropsWithChildren<IProps>) => {
    const styles = useThemeStyles(themeStyles);
    return (
      <Pressable style={[styles.container, style]} onPress={onPress}>
        {children}
      </Pressable>
    );
  },
);
