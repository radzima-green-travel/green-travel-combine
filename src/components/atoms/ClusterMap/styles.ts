import {StyleSheet} from 'react-native';
import {SymbolLayerStyle} from '@react-native-mapbox-gl/maps';
import {MAP_PINS} from 'core/constants';

export const styles = StyleSheet.create({
  container: {flex: 1},
});

export const layerStyles = {
  singlePoint: {
    iconImage: ['get', 'icon_image'],
    iconSize: 1.3,
    iconAllowOverlap: true,
    iconAnchor: 'bottom',
  } as SymbolLayerStyle,
  clusteredPoints: {
    iconImage: MAP_PINS.EMPTY,
    iconSize: 1.3,
    iconAllowOverlap: true,
    iconAnchor: 'bottom',
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
    textColor: '#fff',
    textOffset: [0, -2.2],
  } as SymbolLayerStyle,
};
