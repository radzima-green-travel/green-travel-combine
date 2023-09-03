import {ShapeSource, SymbolLayer} from '@rnmapbox/maps';
import React, {ComponentProps, memo, forwardRef} from 'react';
import {layerStyles} from './styles';

import {FeatureCollection, Geometry, Properties} from '@turf/helpers';

export interface IProps {
  markers: FeatureCollection<Geometry, Properties>;
  onShapePress?: ComponentProps<typeof ShapeSource>['onPress'];
}

export const ClusterMapShape = memo(
  forwardRef<ShapeSource, IProps>(({markers, onShapePress}, ref) => {
    return (
      <ShapeSource
        id={'earthquakes'}
        hitbox={{width: 20, height: 20}}
        cluster
        ref={ref}
        onPress={onShapePress}
        clusterRadius={40}
        clusterMaxZoomLevel={14}
        shape={markers as ComponentProps<typeof ShapeSource>['shape']}>
        <SymbolLayer id={'pointCount'} style={layerStyles.clusterCount} />
        <SymbolLayer
          id={'clusteredPoints'}
          belowLayerID={'pointCount'}
          filter={['has', 'point_count']}
          style={layerStyles.clusteredPoints}
        />
        <SymbolLayer
          id={'singlePoint'}
          filter={['!', ['has', 'point_count']]}
          style={layerStyles.singlePoint}
        />
      </ShapeSource>
    );
  }),
);
