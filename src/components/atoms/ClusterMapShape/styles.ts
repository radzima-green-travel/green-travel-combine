// import {SymbolLayerStyle} from '@rnmapbox/maps';
import {MAP_PINS} from 'core/constants';
export const layerStyles = {
  singlePoint: {
    iconImage: ['get', 'icon_image'],
    iconSize: 1,
    iconAllowOverlap: true,
  },

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
  },

  clusterCount: {
    textField: [
      'step',
      ['get', 'point_count'],
      ['get', 'point_count'],
      999,
      '1K+',
    ],
    textSize: 12,
    textColor: '#000',
    iconAllowOverlap: true,
    textAllowOverlap: true,
  },
};
