import { RestApiEngine } from '../engines';
import { ICoordinates, IObject } from 'core/types';

class MapBoxAPI extends RestApiEngine {
  getDirections({
    from,
    to,
  }: {
    from: ICoordinates;
    to: ICoordinates;
  }): Promise<IObject> {
    return this.get(
      `/directions/v5/mapbox/driving/${from};${to}?access_token=${process.env.EXPO_PUBLIC_MAP_ACCESS_TOKEN}&geometries=geojson`,
    );
  }
}

export const mapBoxApi = new MapBoxAPI(
  process.env.EXPO_PUBLIC_MAP_BOX_CLIENT_URL as string,
);
