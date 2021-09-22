import distance from '@turf/distance';
import {IObject} from 'core/types';
import {reduce, some} from 'lodash';
import {useCallback} from 'react';

import {
  Geometry,
  Feature,
  FeatureCollection,
  Properties,
  point,
} from '@turf/helpers';

import MapBox from '@react-native-mapbox-gl/maps';

function findClosesClusterToObject(
  featuresCollection: FeatureCollection<Geometry, Properties>,
  object: IObject,
) {
  let closestCluster: Feature<Geometry, Properties> | null = null;
  const coordinates = object.location
    ? [object.location.lon!, object.location.lat!]
    : null;

  if (!coordinates) {
    return null;
  }
  const objectPoint = point(coordinates);

  reduce(
    featuresCollection.features,
    (acc, feature) => {
      const distanceBetween = distance(
        point(feature.geometry.coordinates as number[]),
        objectPoint,
      );
      if (distanceBetween < acc && feature.properties?.cluster) {
        closestCluster = feature;
        return distanceBetween;
      }

      return acc;
    },
    Infinity,
  );

  return closestCluster;
}

export function useFindZoomForObjectInCluster({
  shapeSourceRef,
}: {
  shapeSourceRef: React.RefObject<MapBox.ShapeSource>;
}) {
  const findZoomForObjectInCluster = useCallback(
    async (
      object: IObject,
      featuresCollection: FeatureCollection<Geometry, Properties>,
      zoom: number,
    ) => {
      try {
        if (
          some(featuresCollection.features, feature => {
            return feature.properties?.objectId === object.id;
          })
        ) {
          return zoom;
        }

        let closestCluster = findClosesClusterToObject(
          featuresCollection,
          object,
        );

        if (closestCluster) {
          const clusterChildren =
            await shapeSourceRef.current?.getClusterChildren(closestCluster);
          const zoomToExpand =
            await shapeSourceRef.current?.getClusterExpansionZoom(
              closestCluster,
            );

          if (clusterChildren && zoomToExpand) {
            const zoomLevel = await findZoomForObjectInCluster(
              object,
              clusterChildren,
              zoomToExpand,
            );
            return zoomLevel;
          }
        }
        return zoom;
      } catch (e) {
        return zoom;
      }
    },
    [shapeSourceRef],
  );

  return {findZoomForObjectInCluster};
}
