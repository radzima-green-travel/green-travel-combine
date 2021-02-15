import MapboxGL from '@react-native-mapbox-gl/maps';
import React, {memo} from 'react';
import {Props} from './types';
import {layerStyles} from './styles';

export const ClusterMapShape = memo(({markers}: Props) => {
  return (
    <MapboxGL.ShapeSource
      id={'earthquakes'}
      hitbox={{width: 20, height: 20}}
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
