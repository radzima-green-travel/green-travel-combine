import React, {memo, useRef, useState} from 'react';
import {View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Props} from './types';
import {styles} from './styles';

export const ClusterMap = memo<Props>(({onPress, bounds, children}: Props) => {
  const map = useRef(null);
  return (
    <View
      onResponderStart={async (event) => {
        const {locationX, locationY} = event.nativeEvent;

        const {features} = await map.current.queryRenderedFeaturesAtPoint(
          [locationX, locationY],
          null,
          ['singlePoint'],
        );

        onPress(features[0]?.properties?.data || null);
      }}
      onStartShouldSetResponder={() => true}
      style={styles.container}>
      <MapboxGL.MapView
        ref={map}
        animated={false}
        style={styles.container}
        styleURL="mapbox://styles/epm-slr/cki08cwa421ws1aluy6vhnx2h"
        compassEnabled={false}
        logoEnabled={false}>
        <MapboxGL.Camera animationDuration={300} bounds={bounds} />
        {children}
      </MapboxGL.MapView>
    </View>
  );
});
