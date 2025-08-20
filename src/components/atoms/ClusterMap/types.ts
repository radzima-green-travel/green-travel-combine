import {Camera, MapState} from '@rnmapbox/maps';
import {IBounds, ICoordinates, SupportedLocales} from 'core/types';
import * as React from 'react';

export type Props = {
  onPress?: () => void;
  onShapePress?: (objectId: string | null) => void;
  bounds: IBounds | null;
  children: React.ReactNode;
  centerCoordinate?: ICoordinates | null;
  cameraRef?: React.Ref<Camera>;
  attributionPosition?: {bottom: number; right: number};

  testID: string;
  locale: SupportedLocales | null;
  onMapIdle?: (state: MapState) => void;
  onCameraChanged?: (state: MapState) => void;
};
