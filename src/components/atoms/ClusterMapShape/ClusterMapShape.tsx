import MapboxGL, {OnPressEvent} from '@react-native-mapbox-gl/maps';
import React, {useCallback} from 'react';
import {Feature} from '@turf/helpers';
import {head} from 'lodash';
import {Props} from './types';
import {layerStyles} from './styles';

export const ClusterMapShape = ({onMarkerPress, markers, index}: Props) => {
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
    <MapboxGL.ShapeSource
      id={'earthquakes' + index}
      hitbox={{width: 20, height: 20}}
      onPress={onShapePress}
      cluster
      clusterRadius={50}
      clusterMaxZoomLevel={14}
      shape={markers}>
      <MapboxGL.SymbolLayer
        id={'pointCount' + index}
        style={layerStyles.clusterCount}
      />
      <MapboxGL.SymbolLayer
        id={'clusteredPoints' + index}
        belowLayerID={'pointCount' + index}
        filter={['has', 'point_count']}
        style={layerStyles.clusteredPoints}
      />

      <MapboxGL.SymbolLayer
        id={'clusteredPointsShadow' + index}
        belowLayerID={'clusteredPoints' + index}
        filter={['has', 'point_count']}
        style={layerStyles.clusteredPointsShadow}
      />

      <MapboxGL.SymbolLayer
        id={'singlePoint' + index}
        filter={['!', ['has', 'point_count']]}
        style={layerStyles.singlePoint}
      />

      <MapboxGL.CircleLayer
        id={'singlePointCircleShadow' + index}
        belowLayerID={'singlePoint' + index}
        filter={['!', ['has', 'point_count']]}
        style={layerStyles.singlePointCircleShadow}
      />
    </MapboxGL.ShapeSource>
  );
};
