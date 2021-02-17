import React, {memo, useRef} from 'react';
import {View, PixelRatio} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Props} from './types';
import {styles} from './styles';
import {isIOS} from 'services/PlatformService';

export const ClusterMap = memo<Props>(({onPress, bounds, children}: Props) => {
  const map = useRef(null);
  return (
    <View
      onResponderStart={async (event) => {
        const {locationX, locationY} = event.nativeEvent;
        let locX = locationX;
        let locY = locationY;

        if (!isIOS) {
          locX = locationX * PixelRatio.get();
          locY = locationY * PixelRatio.get();
        }

        const {features} = await map.current.queryRenderedFeaturesAtPoint(
          [locX, locY],
          null,
          ['singlePoint'],
        );

        onPress(features[0]?.properties?.data || null);
      }}
      onStartShouldSetResponder={() => true}
      style={styles.container}>
      <MapboxGL.MapView
        ref={map}
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
