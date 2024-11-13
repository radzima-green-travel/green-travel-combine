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
} from 'react-native';

import {CHIP_THEMES} from './constants';
import {styles} from './styles';
import {composeTestID} from 'core/helpers';
import {Icon, IconsNames} from '../Icon';
import {crossHitClop} from '../HeaderSearchbar/styles';

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
  leftIcon?: IconsNames;
  testID: string;
  isShowCloseIcon?: boolean;
  onClosePress?: () => void;
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
        <View style={[styles.contentContainer]}>
          {leftIcon ? (
            <Icon
              style={[iconThemeStyles, styles.leftIcon]}
              name={leftIcon}
              testID={composeTestID(testID, 'leftIcon')}
              size={20}
            />
          ) : null}
          <Text testID={composeTestID(testID, 'text')} style={[finalTextStyle]}>
            {text}
          </Text>
          {isShowCloseIcon ? (
            <Pressable
              testID={composeTestID(testID, 'closeButton')}
              hitSlop={crossHitClop}
              style={styles.rightIcon}
              onPress={onClosePress}>
              <Icon
                style={iconThemeStyles}
                name={'clear'}
                testID={composeTestID(testID, 'closeIcon')}
                size={20}
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
        accessible={false}
        style={[
          styles.container,
          chipThemeStyles.container,
          outlined && chipThemeStyles.outlinedBorder,
          active && chipThemeStyles.active,
          disabled && chipThemeStyles.disabled,
          style,
        ]}
        testID={testID}
        accessibilityState={{checked, disabled}}>
        {renderContent()}
      </TouchableOpacity>
    );
  },
);
