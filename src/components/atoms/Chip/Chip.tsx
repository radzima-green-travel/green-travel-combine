import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  LayoutChangeEvent,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {CHIP_THEMES} from './constants';
import {styles} from './styles';
import {getPlatformsTestID} from 'core/helpers';

export type Props = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  disabled?: boolean;
  checked?: boolean;
  active?: boolean;
  outlined?: boolean;
  leftIcon?: (textStyle: StyleProp<TextStyle>) => React.ReactElement;
  rightIcon?: (textStyle: StyleProp<TextStyle>) => React.ReactElement;
  testID: string;
  iconPosition?: 'left' | 'center';
  isIconOnlyButton?: boolean;
  onButtonLabelLayout?: (event: LayoutChangeEvent) => void;
  iconContainerAnimatedStyle?: StyleProp<ViewStyle>;
  labelAnimatedStyle?: StyleProp<TextStyle>;
};

export const Chip = memo(
  ({
    onPress,
    text,
    leftIcon,
    rightIcon,
    disabled = false,
    checked = false,
    active = false,
    outlined = false,
    textStyle,
    testID,
    style,
    onButtonLabelLayout,
    iconContainerAnimatedStyle,
    labelAnimatedStyle,
  }: Props) => {
    const chipThemeStyles = useThemeStyles(CHIP_THEMES.default);

    const textThemeStyles = [
      chipThemeStyles.text,
      active && chipThemeStyles.activeText,
      disabled && chipThemeStyles.disabledText,
    ];

    const iconThemeStyles = [
      chipThemeStyles.icon,
      active && chipThemeStyles.activeIcon,
      disabled && chipThemeStyles.disabledIcon,
    ];

    const finalTextStyle = [styles.text, textThemeStyles, textStyle];

    const renderContent = () => {
      return (
        <View style={styles.contentContainer}>
          {leftIcon ? (
            <Animated.View
              style={[styles.iconContainer, iconContainerAnimatedStyle]}>
              {leftIcon(iconThemeStyles)}
            </Animated.View>
          ) : null}
          <Animated.Text
            style={[finalTextStyle, labelAnimatedStyle]}
            onLayout={onButtonLabelLayout}>
            {text}
          </Animated.Text>
          {rightIcon ? (
            <Animated.View
              style={[styles.iconContainer, iconContainerAnimatedStyle]}>
              {rightIcon(iconThemeStyles)}
            </Animated.View>
          ) : null}
        </View>
      );
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        disabled={disabled}
        style={[
          styles.container,
          chipThemeStyles.container,
          outlined && chipThemeStyles.outlinedBorder,
          active && chipThemeStyles.active,
          disabled && chipThemeStyles.disabled,
          style,
        ]}
        {...getPlatformsTestID(testID)}
        accessibilityState={{checked, disabled}}>
        {renderContent()}
      </TouchableOpacity>
    );
  },
);
