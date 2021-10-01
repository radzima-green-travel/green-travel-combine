import MapboxGL from '@react-native-mapbox-gl/maps';
import {IBounds, ICoordinates} from 'core/types';
import * as React from 'react';

export type Props = {
  onPress?: () => void;
  onShapePress?: (objectId: string | null) => void;
  bounds: IBounds | null;
  children: React.ReactNode;
  centerCoordinate?: ICoordinates | null;
  cameraRef?: React.LegacyRef<MapboxGL.Camera>;
};
