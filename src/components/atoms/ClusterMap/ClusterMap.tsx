import React, {memo, useRef, forwardRef, useCallback, useMemo} from 'react';
import {View, PixelRatio} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Props} from './types';
import {styles} from './styles';
import {isIOS} from 'services/PlatformService';

export const ClusterMap = memo(
  forwardRef<MapboxGL.Camera, Props>(
    ({onPress, children, onShapePress, bounds}: Props, ref) => {
      const onShapePressed = useRef(false);
      const map = useRef<MapboxGL.MapView>(null);

      const onMapPress = useCallback(() => {
        if (!onShapePressed.current) {
          onPress();
        } else {
          onShapePressed.current = false;
        }
      }, [onPress]);

      const initialBounds = useMemo(() => {
        if (bounds) {
          const [
            ne,
            sw,
            [paddingTop, paddingRight, paddingBottom, paddingLeft],
            duration,
          ] = bounds;
          return {
            animationDuration: duration,
            bounds: {
              ne: ne,
              sw,
              paddingLeft,
              paddingRight,
              paddingTop,
              paddingBottom,
            },
          };
        }
        return {};
      }, [bounds]);

      return (
        <View
          onResponderStart={async event => {
            const {locationX, locationY} = event.nativeEvent;
            let locX = locationX;
            let locY = locationY;

            if (!isIOS) {
              locX = locationX * PixelRatio.get();
              locY = locationY * PixelRatio.get();
            }

            const {features} = await map.current?.queryRenderedFeaturesAtPoint(
              [locX, locY],
              null,
              ['singlePoint'],
            );
            if (features[0]?.properties?.data) {
              onShapePressed.current = true;
              const zoom = await map.current?.getZoom();
              onShapePress(features[0]?.properties?.data, zoom);
            }
          }}
          onStartShouldSetResponder={() => true}
          style={styles.container}>
          <MapboxGL.MapView
            ref={map}
            onPress={onMapPress}
            style={styles.container}
            styleURL="mapbox://styles/epm-slr/cki08cwa421ws1aluy6vhnx2h"
            compassEnabled={false}
            logoEnabled={false}>
            <MapboxGL.Camera {...initialBounds} ref={ref} />
            {children}
          </MapboxGL.MapView>
        </View>
      );
    },
  ),
);
