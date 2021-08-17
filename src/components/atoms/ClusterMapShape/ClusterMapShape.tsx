import MapboxGL, {OnPressEvent} from '@react-native-mapbox-gl/maps';
import React, {ComponentProps, memo, forwardRef} from 'react';
import {layerStyles} from './styles';

import {FeatureCollection, Geometry, Properties} from '@turf/helpers';

export interface IProps {
  markers: FeatureCollection<Geometry, Properties>;
  onShapePress?: (event: OnPressEvent) => void;
}

export const ClusterMapShape = memo(
  forwardRef<MapboxGL.ShapeSource, IProps>(({markers, onShapePress}, ref) => {
    return (
      <MapboxGL.ShapeSource
        id={'earthquakes'}
        hitbox={{width: 20, height: 20}}
        cluster
        ref={ref}
        onPress={onShapePress}
        clusterRadius={50}
        clusterMaxZoomLevel={14}
        shape={markers as ComponentProps<typeof MapboxGL.ShapeSource>['shape']}>
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
  }),
);
