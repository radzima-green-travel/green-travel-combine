import {Camera, MapView} from '@rnmapbox/maps';
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
  onRegionIsChanging?: React.ComponentProps<
    typeof MapView
  >['onRegionIsChanging'];
  testID?: string;
  locale: SupportedLocales | null
};
