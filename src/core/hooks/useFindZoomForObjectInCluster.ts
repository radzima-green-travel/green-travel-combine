import distance from '@turf/distance';
import {IObject} from 'core/types';
import {some, sortBy} from 'lodash';
import {useCallback} from 'react';

import {
  Geometry,
  Feature,
  FeatureCollection,
  Properties,
  point,
} from '@turf/helpers';

import MapBox from '@react-native-mapbox-gl/maps';

function isFeaturesIncludesObject(
  featuresCollection: FeatureCollection<Geometry, Properties>,
  object: IObject,
) {
  return some(featuresCollection.features, feature => {
    return feature.properties?.objectId === object.id;
  });
}

async function findClosesClusterToObject(
  shapeSourceRef: React.RefObject<MapBox.ShapeSource>,
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

  const sortedByDistance = sortBy(featuresCollection.features, [
    feature => {
      return distance(
        point(feature.geometry.coordinates as number[]),
        objectPoint,
      );
    },
  ]);

  for (let i = 0; i <= sortedByDistance.length; i++) {
    const feature = sortedByDistance[i];

    if (feature.properties?.cluster) {
      const childrenOfCluster = await shapeSourceRef.current?.getClusterLeaves(
        feature,
        feature.properties.point_count,
        0,
      );
      if (
        childrenOfCluster &&
        isFeaturesIncludesObject(childrenOfCluster, object)
      ) {
        return feature;
      }
    }
  }

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
        if (isFeaturesIncludesObject(featuresCollection, object)) {
          return zoom;
        }

        let closestCluster = await findClosesClusterToObject(
          shapeSourceRef,
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
