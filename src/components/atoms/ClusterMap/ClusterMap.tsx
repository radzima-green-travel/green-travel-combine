import React, {memo} from 'react';
import {View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Props} from './types';
import {styles} from './styles';

export const ClusterMap = memo<Props>(({onPress, bounds, children}: Props) => {
  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        animated={false}
        onPress={onPress}
        style={styles.container}
        styleURL="mapbox://styles/epm-slr/ckhuwanf0033219oggf3ijesc"
        compassEnabled={false}
        logoEnabled={false}>
        <MapboxGL.Camera animationDuration={300} bounds={bounds} />
        {children}
      </MapboxGL.MapView>
    </View>
  );
});
