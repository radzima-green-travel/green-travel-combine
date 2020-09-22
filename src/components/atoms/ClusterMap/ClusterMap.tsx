import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {head} from 'lodash';
import MapboxGL, {OnPressEvent} from '@react-native-mapbox-gl/maps';
import {Feature} from '@turf/helpers';
import {Props} from './types';
import {styles, layerStyles} from './styles';

export const ClusterMap = memo<Props>(
  ({onPress, onMarkerPress, bounds, markers}: Props) => {
    const onShapePress = useCallback(
      ({features}: OnPressEvent) => {
        const singlePoint: Feature = head(features);
        const {cluster: isClustered = false} = singlePoint?.properties || {};

        onMarkerPress({
          isClustered,
          data: singlePoint?.properties?.data || null,
        });
      },
      [onMarkerPress],
    );

    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          onPress={onPress}
          style={styles.container}
          styleURL="mapbox://styles/epm-slr/ckf3v9bx6126j19r200k73s3u"
          compassEnabled={false}
          logoEnabled={false}>
          <MapboxGL.Camera animationDuration={300} bounds={bounds} />
          <MapboxGL.ShapeSource
            id="earthquakes"
            hitbox={{width: 20, height: 20}}
            onPress={onShapePress}
            cluster
            clusterRadius={50}
            clusterMaxZoomLevel={14}
            shape={markers}>
            <MapboxGL.SymbolLayer
              id="pointCount"
              style={layerStyles.clusterCount}
            />
            <MapboxGL.SymbolLayer
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={layerStyles.clusteredPoints}
            />
            <MapboxGL.SymbolLayer
              id="singlePoint"
              filter={['!', ['has', 'point_count']]}
              style={layerStyles.singlePoint}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
    );
  },
);
