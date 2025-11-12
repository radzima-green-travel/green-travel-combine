import * as Icons from 'assets/icons';
import {getPlatformsTestID} from 'core/helpers';
import React from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import type {SvgProps} from 'react-native-svg';
import {IconName} from './types';

export interface Props {
  name: IconName;
  width?: number | string;
  height?: number | string;
  color?: string;
  size?: number;
  style?: StyleProp<TextStyle>;
  testID?: string;
  checked?: boolean;
}

export const Icon = ({
  name,
  width,
  height,
  color,
  size,
  style = {},
  testID = name,
  checked = false,
}: Props) => {
  const IconComponent = (Icons as Record<IconName, React.FC<SvgProps>>)[name];

  if (!IconComponent) {
    return null;
  }

  const iconStyle = StyleSheet.flatten(style);
  const {fontSize, color: iconColor} = iconStyle;

  const iconWidth =
    fontSize ||
    (height && width) ||
    size ||
    (iconStyle.width as number) ||
    defaultIconSize;
  const iconHeight =
    fontSize ||
    (width && height) ||
    size ||
    (iconStyle.height as number) ||
    defaultIconSize;

  return (
    <IconComponent
      {...getPlatformsTestID(testID)}
      width={iconWidth}
      height={iconHeight}
      style={iconStyle}
      color={iconColor || color || defaultIconColor}
      accessibilityState={{checked}}
    />
  );
};

const defaultIconSize = 24;
const defaultIconColor = 'white';
