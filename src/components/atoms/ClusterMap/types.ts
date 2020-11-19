import {CameraSettings} from '@react-native-mapbox-gl/maps';
import * as React from 'react';

export type Props = {
  onPress: () => void;

  bounds: CameraSettings['bounds'];
  children: React.ReactNode;
};
