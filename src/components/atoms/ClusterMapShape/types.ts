import {FeatureCollection, Geometry, Properties} from '@turf/helpers';

export type Props = {
  markers: FeatureCollection<Geometry, Properties>;
};
