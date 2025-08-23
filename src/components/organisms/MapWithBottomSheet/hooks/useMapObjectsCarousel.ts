import {MapState} from '@rnmapbox/maps';
import {HEADER_BOTTOM_RADIUS, PADDING_HORIZONTAL} from 'core/constants';
import {isEqual} from 'lodash';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {MAP_OBJECTS_CAROUSEL_HEIGHT} from '../components';
import {SNAP_POINT_0} from '../styles';
import {Position} from 'geojson';

export function useMapObjectsCarousel({
  mapViewHeight,
  mapTranslateY,
  bottomSheetAnimatedIndex,
  onMapInteraction,
}: {
  mapViewHeight?: number;
  mapTranslateY: SharedValue<number>;
  bottomSheetAnimatedIndex: SharedValue<number>;
  onMapInteraction: (visibleAreaBbox: number[]) => void;
}) {
  const [isObjectsListVisible, setIsObjectListVisible] = useState(false);

  useAnimatedReaction(
    () => bottomSheetAnimatedIndex.value < 0.1,
    nextVisible => {
      if (nextVisible !== isObjectsListVisible) {
        runOnJS(setIsObjectListVisible)(nextVisible);
      }
    },
  );

  const getMapVisibleAreaBbbox = useCallback(() => {
    if (mapViewHeight) {
      const top =
        HEADER_BOTTOM_RADIUS + PADDING_HORIZONTAL - mapTranslateY.value;
      const right = SCREEN_WIDTH;
      const bottom =
        mapViewHeight -
        SNAP_POINT_0 +
        PADDING_HORIZONTAL -
        MAP_OBJECTS_CAROUSEL_HEIGHT +
        mapTranslateY.value;
      const left = 0;

      return [top, right, bottom, left];
    }

    return null;
  }, [mapTranslateY.value, mapViewHeight]);

  const getVisibleFeaturesInBbox = useCallback(() => {
    if (isObjectsListVisible) {
      const bbox = getMapVisibleAreaBbbox();
      if (bbox) {
        onMapInteraction(bbox);
      }
    }
  }, [getMapVisibleAreaBbbox, isObjectsListVisible, onMapInteraction]);

  const prevCenter = useRef<Position | null>(null);

  const onMapIdle = useCallback(
    (event: MapState) => {
      if (isEqual(prevCenter.current, event?.properties?.center)) {
        return;
      }

      prevCenter.current = event?.properties?.center;
      getVisibleFeaturesInBbox();
    },
    [getVisibleFeaturesInBbox],
  );

  useEffect(() => {
    getVisibleFeaturesInBbox();
  }, [getVisibleFeaturesInBbox, isObjectsListVisible]);

  return {
    isObjectsListVisible,
    onMapIdle,
  };
}
