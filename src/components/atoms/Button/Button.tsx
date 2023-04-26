import {useThemeStyles} from 'core/hooks';
import React, {memo, PropsWithChildren} from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  View,
  TouchableOpacity,
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

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled || loading}
        style={[
          styles.container,
          buttonThemeStyles.container,
          disabled && buttonThemeStyles.disabled,
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
      </TouchableOpacity>
    );
  },
);
