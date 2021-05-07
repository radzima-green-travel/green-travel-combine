import {StyleProp} from 'react-native';
import {LineLayerStyle, SymbolLayerStyle} from '@react-native-mapbox-gl/maps';
import {COLORS} from 'assets';

export const themeLayerStyles = {
  objectDetailsPin: {
    iconImage: ['get', 'icon'],
    iconOffset: [0, -16],
  } as StyleProp<SymbolLayerStyle>,
  direction: {
    lineColor: {
      light: COLORS.logCabin,
      dark: COLORS.white,
    },
    lineCap: 'round',
    lineWidth: 2,
    lineOpacity: 0.84,
    lineDasharray: [2, 4],
  } as StyleProp<LineLayerStyle>,

  route: {
    lineColor: {
      light: COLORS.forestGreen,
      dark: COLORS.oceanGreen,
    },
    lineCap: 'round',
    lineWidth: 3,
    lineOpacity: 1,
  } as StyleProp<LineLayerStyle>,

  area: {
    fillColor: COLORS.apple,
    fillOpacity: 0.5,
  },

  areaStroke: {
    lineColor: COLORS.forestGreen,
  } as StyleProp<LineLayerStyle>,
};
