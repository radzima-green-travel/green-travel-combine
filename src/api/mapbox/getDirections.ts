import {mapBoxApi} from './mapBoxApi';
import {ICoordinates, IObject} from 'core/types';
import config from 'react-native-ultimate-config';

export function getDirections({
  from,
  to,
}: {
  from: ICoordinates;
  to: ICoordinates;
}): Promise<IObject> {
  return mapBoxApi.get(
    `/directions/v5/mapbox/driving/${from};${to}?access_token=${config.MAP_ACCESS_TOKEN}&geometries=geojson`,
  );
}
