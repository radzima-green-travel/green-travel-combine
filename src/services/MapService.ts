import { ICoordinates, IBounds } from 'core/types';
import { featureCollection, point } from '@turf/helpers';
import bbox from '@turf/bbox';

interface MapPaddings {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

class MapService {
  getBoundsFromCoords(
    coords: ICoordinates[],
    paddings: MapPaddings = {},
  ): IBounds {
    const features = featureCollection(coords.map(location => point(location)));

    const bboxArray = bbox(features);

    return this.getBoundsFromBbox(bboxArray, paddings);
  }

  getBoundsFromGeoJSON(geoJSON, paddings: MapPaddings): IBounds {
    const bboxArray = bbox(geoJSON);
    return this.getBoundsFromBbox(bboxArray, paddings);
  }

  getBoundsFromBbox(
    bboxArray: number[],
    { top = 0, right = 0, bottom = 0, left = 0 }: MapPaddings = {},
  ): IBounds {
    const [minLng, minLat, maxLng, maxLat] = bboxArray;

    const southWest: ICoordinates = [minLng, minLat];
    const northEast: ICoordinates = [maxLng, maxLat];

    return [northEast, southWest, [top, right, bottom, left], 300];
  }
}

export const mapService = new MapService();
