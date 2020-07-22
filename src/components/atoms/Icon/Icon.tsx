import React from 'react';

import * as Icons from './icons';

type IconsNames =
  | 'mapMarkerGray'
  | 'cross'
  | 'bookmark'
  | 'home'
  | 'search'
  | 'marker';

interface Props {
  name: IconsNames;
  width?: number | string;
  height?: number | string;
  color?: string;
}

const IconsMap: {[key: string]: any} = Icons;

export const Icon = ({name, width = 25, height = 25, color}: Props) => {
  const IconComponent = IconsMap[name];

  return <IconComponent width={width} height={height} color={color} />;
};
