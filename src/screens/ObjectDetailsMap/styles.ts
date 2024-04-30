// import {LineLayerStyle, SymbolLayerStyle} from '@rnmapbox/maps';
import {COLORS} from 'assets';

export const themeLayerStyles = {
  objectDetailsPin: {
    iconImage: ['get', 'icon'],
    iconOffset: [0, -16],
  },
  direction: {
    lineColor: COLORS.cornflowerBlue,
    lineCap: 'round',
    lineWidth: 6,
  } as unknown,
  directionBackground: {
    lineColor: COLORS.darkBlue,
    lineCap: 'round',
    lineWidth: 8,
  } as unknown,
  route: {
    lineColor: {
      light: COLORS.forestGreen,
      dark: COLORS.oceanGreen,
    },
    lineCap: 'round',
    lineWidth: 3,
    lineOpacity: 1,
  } as unknown,

  area: {
    fillColor: COLORS.apple,
    fillOpacity: 0.5,
  },

  areaStroke: {
    lineColor: COLORS.forestGreen,
  },
};
