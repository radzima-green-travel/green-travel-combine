import {FeatureCollection} from '@turf/helpers';
import {CameraSettings} from '@react-native-mapbox-gl/maps';
import {IObject} from 'core/types';
export type Props = {
  onPress: () => void;
  onMarkerPress: (options: {
    isClustered: boolean;
    data: IObject | null;
  }) => void;
  bounds: CameraSettings['bounds'];
  markers: FeatureCollection<any, {data: IObject}>;
};
