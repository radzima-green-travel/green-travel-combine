import {FeatureCollection} from '@turf/helpers';
import {IObject} from 'core/types';

export type Props = {
  markers: FeatureCollection<any, {data: IObject}>;
};
