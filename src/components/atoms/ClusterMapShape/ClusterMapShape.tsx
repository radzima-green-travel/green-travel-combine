// import {ShapeSource, SymbolLayer} from '@rnmapbox/maps';
import React, {ComponentProps, memo, forwardRef} from 'react';
import {layerStyles} from './styles';

import {FeatureCollection, Geometry, Properties} from '@turf/helpers';

export interface IProps {
  markers: FeatureCollection<Geometry, Properties>;
  onShapePress?: ComponentProps<typeof ShapeSource>['onPress'];
}

export const ClusterMapShape = memo(
  forwardRef<any, IProps>(({markers, onShapePress}, ref) => {
    return null;
  }),
);
