import MapboxGL, {OnPressEvent} from '@react-native-mapbox-gl/maps';
import React, {useCallback, memo} from 'react';
import {Feature} from '@turf/helpers';
import {head} from 'lodash';
import {Props} from './types';
import {layerStyles} from './styles';

export const ClusterMapShape = memo(({onMarkerPress, markers}: Props) => {
  console.log('render');
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
      id={'earthquakes'}
      hitbox={{width: 20, height: 20}}
      onPress={onShapePress}
      cluster
      clusterRadius={50}
      clusterMaxZoomLevel={14}
      shape={markers}>
      <MapboxGL.SymbolLayer
        id={'pointCount'}
        style={layerStyles.clusterCount}
      />
      <MapboxGL.SymbolLayer
        id={'clusteredPoints'}
        belowLayerID={'pointCount'}
        filter={['has', 'point_count']}
        style={layerStyles.clusteredPoints}
      />
      <MapboxGL.SymbolLayer
        id={'singlePoint'}
        filter={['!', ['has', 'point_count']]}
        style={layerStyles.singlePoint}
      />
    </MapboxGL.ShapeSource>
  );
});
