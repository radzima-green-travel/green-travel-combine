import React from 'react';
import {ClusterMap, ClusterMapShape} from 'atoms';
import {StyleProp, View} from 'react-native';

import {
  SymbolLayerStyle,
  ShapeSource,
  SymbolLayer,
  UserLocation,
  UserLocationRenderMode,
  MapState,
} from '@rnmapbox/maps';
import {SupportedLocales} from 'core/types';
import type {FeatureCollection, Point} from 'geojson';

import type {useMapView} from '../../hooks';
import {styles, selectedPointStyle} from './styles';

interface MapProps
  extends Pick<
    ReturnType<typeof useMapView>,
    | 'bounds'
    | 'camera'
    | 'mapRef'
    | 'unfocusUserLocation'
    | 'onShapePress'
    | 'onMapPress'
    | 'userLocationProps'
    | 'markers'
    | 'shapeSourceRef'
    | 'fitToClusterLeaves'
    | 'selectedMarker'
  > {
  currentLocale: SupportedLocales;
  onMapIdle: (state: MapState) => void;
}

export const Map = (props: MapProps) => {
  const {
    bounds,
    camera,
    mapRef,
    unfocusUserLocation,
    onShapePress,
    onMapPress,
    userLocationProps,
    markers,
    shapeSourceRef,
    fitToClusterLeaves,
    selectedMarker,
    onMapIdle,
    currentLocale,
  } = props;
  return (
    <View style={styles.container}>
      <ClusterMap
        bounds={bounds}
        ref={mapRef}
        cameraRef={camera}
        onCameraChanged={unfocusUserLocation}
        onMapIdle={onMapIdle}
        onShapePress={onShapePress}
        onPress={onMapPress}
        locale={currentLocale}
        testID={'clusterMap'}>
        {userLocationProps.visible ? (
          <UserLocation
            renderMode={UserLocationRenderMode.Native}
            {...userLocationProps}
          />
        ) : null}
        {markers ? (
          <ClusterMapShape
            ref={shapeSourceRef}
            onShapePress={fitToClusterLeaves}
            markers={markers}
          />
        ) : null}

        {selectedMarker && markers ? (
          <ShapeSource
            id={'selectedPointShapeSource'}
            shape={selectedMarker as FeatureCollection<Point>}>
            <SymbolLayer
              id={'selectedPoint'}
              style={selectedPointStyle as StyleProp<SymbolLayerStyle>}
            />
          </ShapeSource>
        ) : null}
      </ClusterMap>
    </View>
  );
};
