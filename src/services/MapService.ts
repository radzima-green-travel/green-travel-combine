import {ICoordinates, IBounds} from 'core/types';
import {featureCollection, point} from '@turf/helpers';
import bbox from '@turf/bbox';

class MapService {
  getBoundsFromCoords(coords: ICoordinates[]): IBounds {
    const features = featureCollection(coords.map(location => point(location)));

    const [minLng, minLat, maxLng, maxLat] = bbox(features);

    const southWest: ICoordinates = [minLng, minLat];
    const northEast: ICoordinates = [maxLng, maxLat];

    return [northEast, southWest, [30, 30, 30, 30], 500];
  }

  getBoundsFromGeoJSON(
    geoJSON,
    {
      top = 30,
      right = 30,
      bottom = 30,
      left = 30,
    }: {top?: number; right?: number; bottom?: number; left?: number} = {},
  ): IBounds {
    const [minLng, minLat, maxLng, maxLat] = bbox(geoJSON);

    const southWest: ICoordinates = [minLng, minLat];
    const northEast: ICoordinates = [maxLng, maxLat];

    return [northEast, southWest, [top, right, bottom, left], 500];
  }
}

export const mapService = new MapService();
