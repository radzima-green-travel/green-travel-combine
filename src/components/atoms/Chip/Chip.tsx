import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  LayoutChangeEvent,
  View,
  Text,
} from 'react-native';

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
            <View style={[styles.iconContainer]}>
              {leftIcon(iconThemeStyles)}
            </View>
          ) : null}
          <Text style={[finalTextStyle]} onLayout={onButtonLabelLayout}>
            {text}
          </Text>
          {rightIcon ? (
            <View style={[styles.iconContainer]}>
              {rightIcon(iconThemeStyles)}
            </View>
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
