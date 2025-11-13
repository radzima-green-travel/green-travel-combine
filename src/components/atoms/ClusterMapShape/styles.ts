import { SymbolLayerStyle } from '@rnmapbox/maps';
import { COLORS } from 'assets';
import { MAP_PINS } from 'core/constants';
export const layerStyles = {
  singlePoint: {
    iconImage: ['get', 'icon_image'],
    iconSize: 1,
    iconAllowOverlap: true,
  } as SymbolLayerStyle,

  clusteredPoints: {
    iconImage: [
      'step',
      ['get', 'point_count'],
      MAP_PINS.EMPTY,
      100,
      MAP_PINS.EMPTY_BIG,
    ],
    iconSize: 1,
    iconAllowOverlap: true,
  } as SymbolLayerStyle,

  clusterCount: {
    textField: [
      'step',
      ['get', 'point_count'],
      ['get', 'point_count'],
      999,
      '1K+',
    ],
    textSize: 14,
    textColor: COLORS.light.text.accent,
    textFont: ['Open Sans Bold'],
    iconAllowOverlap: true,
    textAllowOverlap: true,
  } as SymbolLayerStyle,
};
