import {useThemeStyles} from 'core/hooks';
import React, {memo, PropsWithChildren, useState, useCallback} from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import {BUTTON_THEMES} from './constants';
import {styles} from './styles';
import {ButtonThemes} from './types';

type Props = PropsWithChildren<{
  children: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  theme?: ButtonThemes;
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
}>;

export const Button = memo(
  ({
    onPress,
    children,
    loading = false,
    disabled = false,
    style,
    testID,
    theme = 'green',
  }: Props) => {
    const buttonThemeStyles = useThemeStyles(BUTTON_THEMES[theme]);

    const [isActive, setIsActive] = useState(false);

    const setActive = useCallback(() => {
      setIsActive(true);
    }, []);

    const setInactive = useCallback(() => {
      setIsActive(false);
    }, []);

    return (
      <Pressable
        onPressIn={setActive}
        onPressOut={setInactive}
        onPress={onPress}
        style={[
          styles.container,
          buttonThemeStyles.container,
          disabled && buttonThemeStyles.disabled,
          isActive && buttonThemeStyles.active,
          style,
        ]}
        testID={testID}>
        {loading ? (
          <ActivityIndicator
            size="small"
            // @ts-ignore
            color={buttonThemeStyles.text?.color}
          />
        ) : (
          <Text
            style={[
              styles.text,
              buttonThemeStyles.text,
              disabled && buttonThemeStyles.disabledText,
            ]}>
            {children}
          </Text>
        )}
      </Pressable>
    );
  },
);
