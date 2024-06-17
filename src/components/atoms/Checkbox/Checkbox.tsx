import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {StyleProp, ViewStyle, TouchableOpacity} from 'react-native';

import {CHECKBOX_THEMES, CHECKBOX_SIZES, CHECKBOX_SHAPES} from './constants';
import {styles} from './styles';
import {composeTestID} from 'core/helpers';
import {TestIDs} from 'core/types';
import {getPlatformsTestID} from 'core/helpers';
import {Icon} from '../Icon';

export type Props = {
  testID: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  size?: 'small' | 'medium';
  shape?: 'circle' | 'default';
  disabled?: boolean;
  icon?: 'CheckXL' | 'minus' | 'ellipse';
};

export const Checkbox = memo(
  ({
    onPress,
    style,
    testID,
    selected,
    size = 'medium',
    shape = 'default',
    disabled,
    icon = 'CheckXL',
  }: Props) => {
    const checkboxThemeStyles = useThemeStyles(CHECKBOX_THEMES.default);
    const checkboxSizeStyles = useThemeStyles(CHECKBOX_SIZES[size]);
    const checkboxShapeStyles = useThemeStyles(CHECKBOX_SHAPES[shape]);

    return (
      <TouchableOpacity
        onPress={disabled ? undefined : onPress}
        activeOpacity={0.9}
        style={[
          styles.container,
          checkboxSizeStyles.container,
          checkboxThemeStyles.container,
          checkboxShapeStyles.container,
          selected && checkboxThemeStyles.selected,
          disabled && checkboxThemeStyles.disabled,
          style,
        ]}
        {...getPlatformsTestID(testID)}
        accessibilityState={{selected}}>
        {selected ? (
          <Icon
            {...(checkboxThemeStyles.icon as {color: string})}
            {...(disabled
              ? (checkboxThemeStyles.iconDisabled as {color: string})
              : {})}
            name={icon}
            testID={composeTestID(testID, TestIDs.Icon)}
            width={checkboxSizeStyles[`${icon}Icon`].width as number}
            height={checkboxSizeStyles[`${icon}Icon`].height as number}
          />
        ) : null}
      </TouchableOpacity>
    );
  },
);
