import {createSelector} from 'reselect';
import {compact} from 'lodash';
import {
  FeatureCollection,
  featureCollection,
  point,
  Geometry,
} from '@turf/helpers';
import {IObject} from '../types';
import {IState} from 'core/store';
import {isLocationExist} from 'core/helpers';

export const selectObjectDetailsMapOjects = (state: IState) =>
  state.objectDetailsMap.objects;

export const selectMapDirection = (state: IState) =>
  state.objectDetailsMap.direction;

export const selectMapDirectionDistance = (state: IState) =>
  state.objectDetailsMap.distance;

export const selectIsDirectionShowed = createSelector(
  selectMapDirection,
  Boolean,
);

export const createMarkerFromDetailsObject = (
  data: IObject | null,
): FeatureCollection<Geometry, {icon: string; objectId: string}> => {
  return featureCollection(
    compact([
      // @ts-ignore
      data && isLocationExist(data)
        ? point(
            [data.location!.lon!, data.location!.lat!],
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
