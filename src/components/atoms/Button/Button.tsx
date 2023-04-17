import {useThemeStyles} from 'core/hooks';
import React, {memo, PropsWithChildren, useState, useCallback} from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  Pressable,
  View,
} from 'react-native';

import {BUTTON_THEMES} from './constants';
import {styles} from './styles';
import {ButtonThemes} from './types';
import {getPlatformsTestID} from 'core/helpers';

type Props = PropsWithChildren<{
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  theme?: ButtonThemes;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.FC;
  testID?: string;
}>;

export const Button = memo(
  ({
    onPress,
    text,
    leftIcon: LeftIcon,
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
        {...getPlatformsTestID(testID)}>
        {loading ? (
          <ActivityIndicator
            size="small"
            // @ts-ignore
            color={buttonThemeStyles.text?.color}
          />
        ) : (
          <>
            <View style={styles.leftIconWrapper}>
              {LeftIcon && <LeftIcon />}
            </View>
            <Text
              style={[
                styles.text,
                buttonThemeStyles.text,
                disabled && buttonThemeStyles.disabledText,
              ]}>
              {text}
            </Text>
          </>
        )}
      </Pressable>
    );
  },
);
