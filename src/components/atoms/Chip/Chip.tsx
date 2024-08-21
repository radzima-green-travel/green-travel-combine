import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  View,
  Text,
  Pressable,
  GestureResponderEvent,
} from 'react-native';

import {CHIP_THEMES} from './constants';
import {styles} from './styles';
import {getPlatformsTestID, composeTestID} from 'core/helpers';
import {Icon} from '../Icon';

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
  testID: string;
  isShowCloseIcon?: boolean;
  onClosePress?: (event: GestureResponderEvent) => void;
};

export const Chip = memo(
  ({
    onPress,
    onClosePress,
    text,
    leftIcon,
    disabled = false,
    checked = false,
    active = false,
    outlined = false,
    textStyle,
    testID,
    style,
    isShowCloseIcon,
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
          <Text style={[finalTextStyle]}>{text}</Text>
          {isShowCloseIcon ? (
            <Pressable style={[styles.iconContainer]} onPress={onClosePress}>
              <Icon
                style={iconThemeStyles}
                name={'close'}
                testID={composeTestID(testID, 'closeIcon')}
              />
            </Pressable>
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
