import React from 'react';

import * as Icons from './icons';

import {StyleProp, TextStyle, View} from 'react-native';
import {IconsNames} from './IconsNames';
import {getPlatformsTestID} from 'core/helpers';

export interface Props {
  name: IconsNames;
  width?: number | string;
  height?: number | string;
  color?: string;
  size?: number;
  style?: StyleProp<TextStyle>;
  additionalColor?: string;
  testID: string;
  checked?: boolean;
}

const IconsMap: {[key: string]: any} = Icons;

export const Icon = ({
  name,
  width,
  height,
  color,
  size,
  style = {},
  additionalColor,
  testID,
  checked = false,
}: Props) => {
  const IconComponent = IconsMap[name];

  if (!IconComponent) {
    return null;
  }

  const iconStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;
  const {fontSize, color: iconColor} = iconStyle;

  const iconWidth =
    (height && width) ||
    size ||
    iconStyle.width ||
    iconStyle.size ||
    fontSize ||
    24;
  const iconHeight =
    (width && height) ||
    size ||
    iconStyle.height ||
    iconStyle.size ||
    fontSize ||
    24;

  return (
    <View {...getPlatformsTestID(testID)} accessibilityState={{checked}}>
      <IconComponent
        width={iconWidth}
        height={iconHeight}
        style={iconStyle}
        color={iconColor || color || 'white'}
        additionalColor={additionalColor}
      />
    </View>
  );
};
