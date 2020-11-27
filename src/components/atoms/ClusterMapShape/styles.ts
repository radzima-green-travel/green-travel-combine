import {SymbolLayerStyle} from '@react-native-mapbox-gl/maps';
import {MAP_PINS} from 'core/constants';
export const layerStyles = {
  singlePoint: {
    iconImage: ['get', 'icon_image'],
    iconSize: 1,
    iconAllowOverlap: true,
  } as SymbolLayerStyle,

  singlePointCircleShadow: {
    circlePitchAlignment: 'map',
    circleColor: '#000',

    circleRadius: 20,

    circleOpacity: 0.12,
    circleBlur: 0.4,
    circleTranslate: [0, 3],
  } as SymbolLayerStyle,

  clusteredPoints: {
    iconImage: [
      'step',
      ['get', 'point_count'],
      MAP_PINS.OVAL_SMALL,
      100,
      MAP_PINS.OVAL_BIG,
    ],
    iconSize: 1,
    iconAllowOverlap: true,
  } as SymbolLayerStyle,

  clusteredPointsShadow: {
    iconImage: [
      'step',
      ['get', 'point_count'],
      'blur-big-oval',
      100,
      'blur-big-oval',
    ],
    iconSize: 1,
    iconAllowOverlap: true,
    iconOffset: [0, 3],
  } as SymbolLayerStyle,

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
  } as SymbolLayerStyle,
};
