import React, {
  memo,
  useRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { View, PixelRatio, GestureResponderEvent } from 'react-native';
import { MapView, Camera } from '@rnmapbox/maps';
import { Props } from './types';
import { styles } from './styles';
import { isIOS } from 'services/PlatformService';
import { useColorScheme } from 'core/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPlatformsTestID } from 'core/helpers';
import { DEFAULT_LOCALE } from 'core/constants';

export const ClusterMap = memo(
  forwardRef<MapView, Props>(
    (
      {
        onPress,
        children,
        onShapePress,
        bounds,
        centerCoordinate,
        cameraRef,
        attributionPosition,
        onCameraChanged,
        onMapIdle,
        locale,
        testID,
      }: Props,
      ref,
    ) => {
      const onShapePressed = useRef(false);
      const { top } = useSafeAreaInsets();
      const map = useRef<MapView>(null);

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
            zoomLevel: 12,
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
            const { locationX, locationY } = event.nativeEvent;
            let locX = locationX;
            let locY = locationY;

            if (!isIOS) {
              locX = locationX * PixelRatio.get();
              locY = locationY * PixelRatio.get();
            }

            const { features } =
              (await map.current?.queryRenderedFeaturesAtPoint(
                [locX, locY],
                undefined,
                ['singlePoint', 'areaFill'],
              )) || { features: [] };

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
          onStartShouldSetResponderCapture={event => {
            onResponderStart(event);
            return false;
          }}
          style={styles.container}
          {...getPlatformsTestID(testID)}>
          <MapView
            ref={map}
            onPress={onMapPress}
            style={styles.container}
            onMapIdle={onMapIdle}
            styleURL={
              theme === 'light'
                ? 'mapbox://styles/epm-slr/cm8x0gqum00d901s5ap8h4l9c'
                : 'mapbox://styles/epm-slr/cm8x0i6zo00n701qz8028au30'
            }
            logoPosition={{ left: 22, bottom: 22 }}
            attributionPosition={
              attributionPosition || { bottom: isIOS ? 90 : 100, right: 30 }
            }
            localizeLabels={{ locale: locale ?? DEFAULT_LOCALE }}
            compassEnabled={true}
            compassFadeWhenNorth
            onCameraChanged={onCameraChanged}
            compassPosition={{ top: top > 20 ? 0 : 10, right: 16 }}
            scaleBarEnabled={false}>
            <Camera {...initialBounds} ref={cameraRef} />
            {children}
          </MapView>
        </View>
      );
    },
  ),
);
