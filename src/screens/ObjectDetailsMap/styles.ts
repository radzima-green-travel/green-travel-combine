import { StyleProp } from 'react-native';
import { LineLayerStyle, SymbolLayerStyle } from '@rnmapbox/maps';
import { COLORS } from 'assets';

export const themeLayerStyles = {
  objectDetailsPin: {
    iconImage: ['get', 'icon'],
    iconOffset: [0, -16],
  } as StyleProp<SymbolLayerStyle>,
  direction: {
    lineColor: COLORS.cornflowerBlue,
    lineCap: 'round',
    lineWidth: 6,
  } as unknown as StyleProp<LineLayerStyle>,
  directionBackground: {
    lineColor: COLORS.darkBlue,
    lineCap: 'round',
    lineWidth: 8,
  } as unknown as StyleProp<LineLayerStyle>,
  route: {
    lineColor: {
      light: COLORS.forestGreen,
      dark: COLORS.oceanGreen,
    },
    lineCap: 'round',
    lineWidth: 3,
    lineOpacity: 1,
  } as unknown as StyleProp<LineLayerStyle>,

  area: {
    fillColor: COLORS.apple,
    fillOpacity: 0.5,
  },

  areaStroke: {
    lineColor: COLORS.forestGreen,
  } as StyleProp<LineLayerStyle>,

  container: {
    flex: 1,
  },
};
