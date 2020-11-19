import {SymbolLayerStyle} from '@react-native-mapbox-gl/maps';

export const layerStyles = {
  singlePoint: {
    iconImage: ['get', 'icon_image'],
    iconSize: 1,
    iconAllowOverlap: true,
    textTranslateTransition: {delay: 5000, duration: 0},
  } as SymbolLayerStyle,

  singlePointCircle: {
    circlePitchAlignment: 'map',
    circleColor: '#fff',
    circleRadius: 20,
    circleOpacity: 1,
  } as SymbolLayerStyle,

  singlePointCircleShadow: {
    circlePitchAlignment: 'map',
    circleColor: '#000',

    circleRadius: 25,

    circleOpacity: 0.12,
    circleBlur: 0.4,
    circleTranslate: [0, 5],
  } as SymbolLayerStyle,

  clusteredPoints: {
    circlePitchAlignment: 'map',
    circleColor: [
      'step',
      ['get', 'point_count'],
      '#fff',
      100,
      '#fff',
      750,
      '#fff',
    ],

    circleRadius: ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],

    circleOpacity: 1,
  } as SymbolLayerStyle,

  clusteredPointsShadow: {
    circlePitchAlignment: 'map',
    circleColor: '#000',

    circleRadius: ['step', ['get', 'point_count'], 25, 100, 35, 750, 45],

    circleOpacity: 0.12,
    circleBlur: 0.4,
    circleTranslate: [0, 5],
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
