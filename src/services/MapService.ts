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
}

export const mapService = new MapService();
