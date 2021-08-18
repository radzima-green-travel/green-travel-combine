import React, {memo, useRef, forwardRef, useCallback, useMemo} from 'react';
import {View, PixelRatio} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Props} from './types';
import {styles} from './styles';
import {isIOS} from 'services/PlatformService';
import {useColorScheme} from 'core/hooks';

export const ClusterMap = memo(
  forwardRef<MapboxGL.Camera, Props>(
    (
      {onPress, children, onShapePress, bounds, centerCoordinate}: Props,
      ref,
    ) => {
      const onShapePressed = useRef(false);
      const map = useRef<MapboxGL.MapView>(null);
      const theme = useColorScheme();
      const onMapPress = useCallback(() => {
        if (!onShapePressed.current) {
          onPress?.();
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
        if (centerCoordinate) {
          return {
            zoomLevel: 8,
            centerCoordinate: centerCoordinate,
            animationDuration: 500,
          };
        }

        return {};
      }, [bounds, centerCoordinate]);

      return (
        <View
          onResponderStart={async event => {
            if (!onShapePress) {
              return;
            }
            const {locationX, locationY} = event.nativeEvent;
            let locX = locationX;
            let locY = locationY;

            if (!isIOS) {
              locX = locationX * PixelRatio.get();
              locY = locationY * PixelRatio.get();
            }

            const {features} = await map.current?.queryRenderedFeaturesAtPoint(
              [locX, locY],
              undefined,
              ['singlePoint', 'areaFill'],
            );

            if (features[0]?.properties?.objectId) {
              onShapePressed.current = true;
              const zoom = await map.current?.getZoom()!;
              onShapePress(features[0]?.properties?.objectId, zoom);
            } else if (features[0]?.geometry.type === 'Polygon') {
              onShapePress(null);
            } else if (!features.length) {
              onShapePressed.current = false;
            }
          }}
          onStartShouldSetResponder={() => true}
          style={styles.container}>
          <MapboxGL.MapView
            ref={map}
            onPress={onMapPress}
            style={styles.container}
            styleURL={
              theme === 'light'
                ? 'mapbox://styles/epm-slr/cki08cwa421ws1aluy6vhnx2h'
                : 'mapbox://styles/epm-slr/ckodyal5d3i9017pb9vii6v18'
            }
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
