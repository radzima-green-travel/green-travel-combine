import React from 'react';

import * as Icons from './icons';

type IconsNames =
  | 'mapMarkerGray'
  | 'cross'
  | 'bookmark'
  | 'home'
  | 'search'
  | 'marker'
  | 'bicycle';

interface Props {
  name: IconsNames;
  width?: number | string;
  height?: number | string;
  color?: string;
  size?: number;
}

const IconsMap: {[key: string]: any} = Icons;

export const Icon = ({name, width, height, color, size = 25}: Props) => {
  const IconComponent = IconsMap[name];

  return (
    <IconComponent
      width={width || size}
      height={height || size}
      color={color}
    />
  );
};
