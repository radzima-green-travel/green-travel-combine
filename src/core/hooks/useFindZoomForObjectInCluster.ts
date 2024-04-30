// import distance from '@turf/distance';
import {IObject} from 'core/types';
import {some, sortBy} from 'lodash';
import {useCallback} from 'react';

import {Geometry, Feature, Properties, point} from '@turf/helpers';

import Supercluster from 'supercluster';

function isFeaturesIncludesObject(
  features: Feature<Geometry, Properties>[],
  object: IObject,
) {
  return some(features, feature => {
    return feature.properties?.objectId === object.id;
  });
}

function findClosesClusterToObject(
  cluster: Supercluster<Supercluster.AnyProps, Supercluster.AnyProps>,
  features: Feature<Geometry, Properties>[],
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

  const sortedByDistance = sortBy(features, [
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
      const childrenOfCluster = cluster.getLeaves(
        feature.properties.cluster_id,
        Infinity,
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

export function useFindZoomForObjectInCluster() {
  const findZoomForObjectInCluster = useCallback(
    (
      cluster: Supercluster<Supercluster.AnyProps, Supercluster.AnyProps>,
      object: IObject,
      features: Feature<Geometry, Properties>[],
      zoom: number,
    ) => {
      try {
        if (isFeaturesIncludesObject(features, object)) {
          return zoom;
        }

        let closestCluster = findClosesClusterToObject(
          cluster,
          features,
          object,
        );

        if (closestCluster && closestCluster.properties?.cluster_id) {
          const clusterChildren = cluster.getChildren(
            closestCluster.properties.cluster_id,
          );
          const zoomToExpand = cluster.getClusterExpansionZoom(
            closestCluster.properties.cluster_id,
          );

          if (clusterChildren && zoomToExpand) {
            const zoomLevel = findZoomForObjectInCluster(
              cluster,
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
    [],
  );

  return {findZoomForObjectInCluster};
}
