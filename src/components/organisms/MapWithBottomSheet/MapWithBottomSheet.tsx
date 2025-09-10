import React, {useState, useCallback, useEffect, useRef} from 'react';
import {LayoutChangeEvent, Text, View} from 'react-native';
import Animated, {
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  LinearTransition,
  withTiming,
  ZoomIn,
  ZoomOut,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import {Button, Icon, LoadingView, MapButtonContainer} from 'atoms';
import {
  Map,
  MapObjectsCarousel,
  MAP_OBJECTS_CAROUSEL_HEIGHT,
} from './components';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles, SNAP_POINT_0, SNAP_POINT_1} from './styles';
import {useMapView} from './hooks';
import {Feature, Geometry} from '@turf/helpers';

import {ObjectMap, SearchObject, SupportedLocales} from 'core/types';

import {MapState} from '@rnmapbox/maps';
import {HEADER_BOTTOM_RADIUS, PADDING_HORIZONTAL} from 'core/constants';
import {isEqual} from 'lodash';

import {isAndroid, SCREEN_WIDTH} from 'services/PlatformService';
import {} from './components';
import {Position} from 'geojson';

interface MapWithBottomSheetProps {
  mapObjects: ObjectMap[];
  visibleObjectsOnMap: SearchObject[];
  onMarkersAppear: (
    markers: Array<Feature<Geometry, {icon_image: string; objectId: string}>>,
  ) => void;
  onMenuPositionChange: (index: number) => void;

  children: React.ReactNode;
  loading: boolean;
  totalResults: number;
  currentLocale: SupportedLocales;
  onObjectPress: (object: SearchObject) => void;
  onTouch?: () => void;
}

export const MapWithBottomSheet: React.FC<MapWithBottomSheetProps> = ({
  loading,
  children,
  totalResults,
  currentLocale,
  onMenuPositionChange,
  mapObjects,
  visibleObjectsOnMap,
  onMarkersAppear,
  onObjectPress,
  onTouch,
}) => {
  const snapPoints = [SNAP_POINT_0, SNAP_POINT_1, '100%'];

  const {t} = useTranslation('search');

  const {
    getVisibleFeatures,
    onShowLocationPress,
    isUserLocationFocused,
    visibleObjects,
    carouselRef,
    onCarouselSnap,
    bottomMenuRef,
    bottomMenuOpened,
    setBottomMenuOpened,
    ...mapProps
  } = useMapView({
    mapObjects: mapObjects,
    visibleObjects: visibleObjectsOnMap,
    onMarkersAppear: onMarkersAppear,
  });

  const styles = useThemeStyles(themeStyles);
  const [mapViewPort, setMapViewPort] = useState<{
    height: number;
    width: number;
  } | null>(null);

  const calculateMapViewPort = useCallback(
    ({nativeEvent}: LayoutChangeEvent) => {
      setMapViewPort({
        width: nativeEvent.layout.width,
        height: nativeEvent.layout.height,
      });
    },
    [],
  );
  const animatedPosition = useSharedValue(0);
  const animatedIndex = useSharedValue(0);

  const translateY = useDerivedValue(() => {
    if (mapViewPort?.height) {
      const maxPosition = mapViewPort.height - SNAP_POINT_1;

      return (
        -(mapViewPort.height - Math.max(maxPosition, animatedPosition.value)) /
        2
      );
    }

    return 0;
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const animatedRef = useAnimatedRef();
  const visibleObjectsAnimatedStyle = useAnimatedStyle(() => {
    const measurement = measure(animatedRef);
    const height = (measurement?.height || 200) + 12;

    return {
      transform: [
        {
          translateY: animatedPosition.value - height,
        },
      ],
    };
  });

  const overlay = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animatedIndex.value < 0.1 ? 1 : 0),
    };
  });

  const mapButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(animatedIndex.value > 1.99 ? 1 : 0, {
            duration: 150,
          }),
        },
      ],
    };
  });

  useAnimatedReaction(
    () => animatedIndex.value < 0.1,
    nextOpened => {
      if (nextOpened !== bottomMenuOpened) {
        runOnJS(setBottomMenuOpened)(nextOpened);
      }
    },
  );

  const getMapVisibleAreaBbbox = useCallback(() => {
    if (mapViewPort?.height) {
      const top = HEADER_BOTTOM_RADIUS + PADDING_HORIZONTAL - translateY.value;
      const right = isAndroid ? 1000 : SCREEN_WIDTH;
      const bottom = isAndroid
        ? 1000
        : mapViewPort.height -
          SNAP_POINT_0 +
          PADDING_HORIZONTAL -
          MAP_OBJECTS_CAROUSEL_HEIGHT +
          translateY.value;
      const left = 0;

      return [top * (isAndroid ? 2 : 1), right, bottom, left];
    }

    return null;
  }, [translateY.value, mapViewPort?.height]);

  const getVisibleFeaturesInBbox = useCallback(() => {
    const bbox = getMapVisibleAreaBbbox();
    if (bbox) {
      getVisibleFeatures(bbox);
    }
  }, [getMapVisibleAreaBbbox, getVisibleFeatures]);

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
  }, [getVisibleFeaturesInBbox, bottomMenuOpened]);

  return (
    <>
      <Animated.View
        ref={animatedRef}
        style={styles.listContainer}
        onTouchStart={onTouch}>
        <Animated.View onLayout={calculateMapViewPort} style={animatedStyles}>
          <Map
            {...mapProps}
            onMapIdle={onMapIdle}
            currentLocale={currentLocale}
          />
        </Animated.View>

        {loading ? (
          <Animated.View
            pointerEvents={'none'}
            entering={ZoomIn}
            exiting={ZoomOut}
            style={styles.loaderContainer}>
            <MapButtonContainer
              testID={'mapButtonContainer'}
              onPress={onShowLocationPress}>
              <LoadingView size="small" />
            </MapButtonContainer>
          </Animated.View>
        ) : null}

        <Animated.View
          pointerEvents="box-none"
          layout={LinearTransition}
          style={[styles.visibleObjectsContainer, visibleObjectsAnimatedStyle]}>
          <Animated.View
            pointerEvents="box-none"
            style={styles.mapButtonContainer}
            layout={LinearTransition}>
            <MapButtonContainer
              testID={'mapButtonContainer'}
              onPress={onShowLocationPress}>
              <Icon
                style={styles.icon}
                name={
                  isUserLocationFocused ? 'showLocationFilled' : 'showLocation'
                }
                size={24}
              />
            </MapButtonContainer>
          </Animated.View>

          {bottomMenuOpened ? (
            <MapObjectsCarousel
              selectedObject={mapProps.selectedObject}
              objects={visibleObjects}
              carouselRef={carouselRef}
              onCarouselSnap={onCarouselSnap}
              onObjectPress={onObjectPress}
            />
          ) : null}
        </Animated.View>
        <BottomSheet
          ref={bottomMenuRef}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetContainer}
          enableDynamicSizing={false}
          handleStyle={styles.handleContainer}
          animatedIndex={animatedIndex}
          handleIndicatorStyle={styles.indicator}
          animatedPosition={animatedPosition}
          onChange={onMenuPositionChange}
          index={2}>
          {children}
          <Animated.View
            pointerEvents="none"
            style={[styles.overlayStyle, overlay]}>
            <View style={styles.resultsContainer}>
              <Text>
                <Text style={styles.resultsLabel}>{t('results')}</Text>
                <Text> </Text>
                <Text style={styles.resultsCount}>{totalResults}</Text>
              </Text>
            </View>
          </Animated.View>
        </BottomSheet>
      </Animated.View>
      <Animated.View
        style={[styles.bottomButtonContainer, mapButtonStyle]}
        pointerEvents="box-none">
        <Button
          elevated
          testID="mapButton"
          text={t('map')}
          style={styles.bottomButton}
          onPress={() => bottomMenuRef.current?.snapToIndex(0)}
          renderIcon={textStyle => <Icon name="map" style={textStyle} />}
        />
      </Animated.View>
    </>
  );
};
