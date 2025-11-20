import { useThemeStyles } from 'core/hooks';
import React, { memo, PropsWithChildren } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { themeStyles } from './styles';
import { getPlatformsTestID } from 'core/helpers';

interface IProps {
  onPress: () => void;
  testID: string;
  style?: StyleProp<ViewStyle>;
}

export const MapButtonContainer = memo(
  ({ children, style, onPress, testID }: PropsWithChildren<IProps>) => {
    const styles = useThemeStyles(themeStyles);
    return (
      <Pressable
        style={[styles.container, style]}
        onPress={onPress}
        {...getPlatformsTestID(testID)}>
        {children}
      </Pressable>
    );
  },
);
