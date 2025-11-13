import type { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

export type Props = {
  markers: FeatureCollection<Geometry, GeoJsonProperties>;
};
