import {createSelector} from 'reselect';
import {isEmpty, map, compact, reduce, some} from 'lodash';
import {
  FeatureCollection,
  featureCollection,
  point,
  Geometry,
} from '@turf/helpers';
import {MAP_PINS} from '../constants';
import {
  ICoordinates,
  IObject,
  IObjectWithIcon,
  IMapFilter,
  IBounds,
  ITransformedData,
} from '../types';
import bbox from '@turf/bbox';
import {IState} from 'core/store';
import {selectTransformedData} from './homeSelectors';

export const selectMapFilters = createSelector<
  IState,
  ITransformedData | null,
  IMapFilter[]
>(selectTransformedData, transformedData => {
  return transformedData
    ? reduce(
        Object.values(transformedData.categoriesMap),
        (acc, category) => {
          if (
            !isEmpty(category.objects) &&
            some(category.objects, id =>
              Boolean(transformedData.objectsMap[id]?.location),
            )
          ) {
            const {name, _id, icon} = category;
            return [
              ...acc,
              {
                title: name,
                icon,
                categoryId: _id,
              },
            ];
          }

          return acc;
        },
        [] as IMapFilter[],
      )
    : [];
});

export const selectMapMarkers = createSelector<
  IState,
  IMapFilter[],
  ITransformedData | null,
  IMapFilter[],
  FeatureCollection<Geometry, {icon_image: string; data: IObject}>
>(
  selectTransformedData,
  (_, filters) => filters,
  (transformedData, filters) => {
    const points = transformedData
      ? compact(
          map(Object.values(transformedData.objectsMap), data => {
            const isMatchToFilters =
              isEmpty(filters) ||
              some(filters, ({categoryId}) => categoryId === data.category);

            const category = transformedData.categoriesMap[data.category];
            if (
              data.location &&
              data.location.coordinates &&
              category &&
              category.icon &&
              isMatchToFilters
            ) {
              const {location} = data;
              return point(
                location.coordinates,
                {
                  icon_image: category.icon,
                  data,
                },
                {id: location._id},
              );
            }
            return null;
          }),
        )
      : [];

    return featureCollection(points);
  },
);

export const selectSelectedMapMarker = createSelector<
  IState,
  string | null,
  ITransformedData | null,
  string | null,
  IObjectWithIcon | null
>(
  selectTransformedData,
  (_, selectedObjectId) => selectedObjectId,
  (transformedData, selectedObjectId) => {
    if (!selectedObjectId || !transformedData) {
      return null;
    }
    const selectedObject = transformedData.objectsMap[selectedObjectId];
    const category = transformedData.categoriesMap[selectedObject?.category];

    return selectedObject && category
      ? {...selectedObject, icon: category.icon}
      : null;
  },
);

export const createMarkerFromObject = (
  data: IObjectWithIcon | null,
): FeatureCollection<Geometry, {icon_image: string; data: IObject}> => {
  return featureCollection(
    compact([
      data
        ? point(
            data.location.coordinates,
            {
              icon_image: `${data.icon}${MAP_PINS.SELECTED_POSTFIX}`,
              data,
            },
            {id: data.location._id},
          )
        : undefined,
    ]),
  );
};

export const selectBounds = createSelector<
  IState,
  IMapFilter[],
  FeatureCollection<Geometry, {icon_image: string; data: IObject}>,
  IMapFilter[],
  IBounds | null
>(
  selectMapMarkers,
  (_, filters) => filters,
  markers => {
    if (isEmpty(markers.features)) {
      return null;
    }

    const [minLng, minLat, maxLng, maxLat] = bbox(markers);

    const southWest: ICoordinates = [minLng, minLat];
    const northEast: ICoordinates = [maxLng, maxLat];

    return [northEast, southWest, [30, 30, 30, 30], 500];
  },
);
