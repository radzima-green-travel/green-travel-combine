import React, {
  memo,
  useRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {View, PixelRatio, GestureResponderEvent} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Props} from './types';
import {styles} from './styles';
import {isIOS} from 'services/PlatformService';
import {useColorScheme} from 'core/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const ClusterMap = memo(
  forwardRef<MapboxGL.MapView, Props>(
    (
      {
        onPress,
        children,
        onShapePress,
        bounds,
        centerCoordinate,
        cameraRef,
      }: Props,
      ref,
    ) => {
      const onShapePressed = useRef(false);
      const {top} = useSafeAreaInsets();
      const map = useRef<MapboxGL.MapView>(null);

      useEffect(() => {
        if (ref) {
          // @ts-ignore
          ref.current = map.current;
        }
      });

      const theme = useColorScheme();
      const onMapPress = useCallback(() => {
        if (!onShapePressed.current) {
          onPress?.();
        } else {
          onShapePressed.current = false;
        }
      }, [onPress]);

      const [initialBounds] = useState(() => {
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
      });

      const onResponderStart = useCallback(
        async (event: GestureResponderEvent) => {
          try {
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

              onShapePress(features[0]?.properties?.objectId);
            } else if (features[0]?.geometry.type === 'Polygon') {
              onShapePress(null);
            } else if (!features.length) {
              onShapePressed.current = false;
            }
          } catch (e) {
            console.log(e);
          }
        },
        [onShapePress],
      );

      return (
        <View
          onResponderStart={onResponderStart}
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
            logoPosition={{left: 22, bottom: 22}}
            // attributionPosition={{top: top, right: top > 20 ? 17 : 7}}
            attributionPosition={{bottom: 90, right: 30}}
            compassEnabled={true}
            compassViewMargins={{y: top > 20 ? top : top + 10, x: 16}}>
            <MapboxGL.Camera {...initialBounds} ref={cameraRef} />
            {children}
          </MapboxGL.MapView>
        </View>
      );
    },
  ),
);
