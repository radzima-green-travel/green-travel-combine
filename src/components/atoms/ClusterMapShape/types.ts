import {FeatureCollection} from '@turf/helpers';
import {IObject} from 'core/types';

export type Props = {
  onMarkerPress: (options: {
    isClustered: boolean;
    data: IObject | null;
  }) => void;
  markers: FeatureCollection<any, {data: IObject}>;
};
