import {StyleProp} from 'react-native';
import {LineLayerStyle} from '@react-native-mapbox-gl/maps';
import {COLORS} from 'assets';

export const layersStyles = {
  objectDetailsPin: {
    iconImage: ['get', 'icon'],
    iconOffset: [0, -16],
  },
  direction: {
    lineColor: 'black',
    lineCap: 'round',
    lineWidth: 2,
    lineOpacity: 0.84,
    lineDasharray: [2, 4],
  } as StyleProp<LineLayerStyle>,

  route: {
    lineColor: COLORS.forestGreen,
    lineCap: 'round',
    lineWidth: 3,
    lineOpacity: 1,
  } as StyleProp<LineLayerStyle>,
};
