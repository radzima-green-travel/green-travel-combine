import {createSelector} from 'reselect';
import {isEmpty, map, compact, reduce, some} from 'lodash';
import {
  FeatureCollection,
  featureCollection,
  point,
  Geometry,
  Feature,
  LineString,
} from '@turf/helpers';
import {MAP_PINS} from '../constants';
import {IObject, IMapFilter, ITransformedData} from '../types';
import {IState} from 'core/store';
import {selectTransformedData} from './homeSelectors';

export const selectSelectedFilters = (state: IState) =>
  state.appMap.selectedFilters;
export const selectSelectedMarkerId = (state: IState) =>
  state.appMap.selectedMarkerId;

export const selectObjectDetailsMapOjects = (state: IState) =>
  state.objectDetailsMap.objects;

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
            const {name, id, icon} = category;
            return [
              ...acc,
              {
                title: name,
                icon,
                categoryId: id,
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
  ITransformedData | null,
  IMapFilter[],
  FeatureCollection<Geometry, {icon_image: string; objectId: string}>
>(selectTransformedData, selectSelectedFilters, (transformedData, filters) => {
  const points = transformedData
    ? compact(
        map(Object.values(transformedData.objectsMap), data => {
          const isMatchToFilters =
            isEmpty(filters) ||
            some(filters, ({categoryId}) => categoryId === data.category.id);

          if (data.location && isMatchToFilters) {
            const {location} = data;
            return point(
              [location.lon, location.lat],
              {
                icon_image: data.category.icon,
                objectId: data.id,
              },
              {id: data.id},
            );
          }
          return null;
        }),
      )
    : [];

  return featureCollection(points);
});

export const selectSelectedMapMarker = createSelector<
  IState,
  ITransformedData | null,
  string | null,
  IObject | null
>(
  selectTransformedData,
  selectSelectedMarkerId,
  (transformedData, selectedObjectId) => {
    if (!selectedObjectId || !transformedData) {
      return null;
    }

    return transformedData.objectsMap[selectedObjectId];
  },
);

export const createMarkerFromObject = (
  data: IObject | null,
): FeatureCollection<Geometry, {icon_image: string; objectId: string}> => {
  return featureCollection(
    compact([
      data
        ? point(
            [data.location.lon, data.location.lat],
            {
              icon_image: `${data.category.icon}${MAP_PINS.SELECTED_POSTFIX}`,
              objectId: data.id,
            },
            {id: data.id},
          )
        : undefined,
    ]),
  );
};

export const selectMapDirection = (state: IState) =>
  state.objectDetailsMap.direction;

export const selectMapDirectionDistance = (state: IState) =>
  state.objectDetailsMap.distance;

export const selectIsDirectionShowed = createSelector<
  IState,
  Feature<LineString, unknown> | null,
  boolean
>(selectMapDirection, Boolean);

export const createMarkerFromDetailsObject = (
  data: IObject | null,
): FeatureCollection<Geometry, {icon: string; objectId: string}> => {
  return featureCollection(
    compact([
      data
        ? point(
            [data.location.lon, data.location.lat],
            {
              icon: 'mapPin',
              objectId: data.id,
            },
            {id: data.id},
          )
        : undefined,
    ]),
  );
};
