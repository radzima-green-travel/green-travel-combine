import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  View,
  TouchableOpacity,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {BUTTON_THEMES} from './constants';
import {styles} from './styles';
import {ButtonThemes} from './types';
import {getPlatformsTestID} from 'core/helpers';

export type Props = {
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  theme?: ButtonThemes;
  loading?: boolean;
  disabled?: boolean;
  checked?: boolean;
  renderIcon?: (textStyle: StyleProp<TextStyle>) => React.ReactElement;
  testID: string;
  iconPosition?: 'left' | 'center';
  isIconOnlyButton?: boolean;
  onButtonLabelLayout?: (event: LayoutChangeEvent) => void;
  iconContainerAnimatedStyle?: StyleProp<ViewStyle>;
  labelAnimatedStyle?: StyleProp<TextStyle>;
  elevated?: boolean;
};

export const Button = memo(
  ({
    onPress,
    text,
    renderIcon,
    loading = false,
    disabled = false,
    checked = false,
    style,
    textStyle,
    testID,
    theme = 'primary',
    iconPosition = 'center',
    isIconOnlyButton,
    onButtonLabelLayout,
    iconContainerAnimatedStyle,
    labelAnimatedStyle,
    elevated,
  }: Props) => {
    const buttonThemeStyles = useThemeStyles(BUTTON_THEMES[theme]);

    const textThemeStyles = [
      buttonThemeStyles.text,
      disabled && buttonThemeStyles.disabledText,
    ];

    const finalTextStyle = [styles.text, textThemeStyles, textStyle];

    const renderContent = () => {
      if (loading) {
        return (
          <ActivityIndicator
            size="small"
            color={(buttonThemeStyles.text as TextStyle)?.color}
          />
        );
      }

      return (
        <View style={styles.contentContainer}>
          {renderIcon ? (
            <Animated.View
              style={[
                !isIconOnlyButton && styles.iconContainer,
                iconPosition === 'left' && styles.leftIconContainer,
                iconContainerAnimatedStyle,
              ]}>
              {renderIcon(textThemeStyles)}
            </Animated.View>
          ) : null}
          {text && !isIconOnlyButton ? (
            <Animated.Text
              style={[finalTextStyle, labelAnimatedStyle]}
              onLayout={onButtonLabelLayout}>
              {text}
            </Animated.Text>
          ) : null}
        </View>
      );
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        disabled={disabled || loading}
        style={[
          styles.container,
          buttonThemeStyles.container,
          disabled && buttonThemeStyles.disabled,
          elevated && styles.shadow,
          style,
          isIconOnlyButton && styles.iconButton,
        ]}
        {...getPlatformsTestID(testID)}
        accessibilityState={{checked, disabled, busy: loading}}>
        {renderContent()}
      </TouchableOpacity>
    );
  },
);
