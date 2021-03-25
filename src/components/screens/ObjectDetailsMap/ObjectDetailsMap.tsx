import {Button, ClusterMap, Icon} from 'atoms';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import MapBox from '@react-native-mapbox-gl/maps';
import {IProps} from './types';
import {selectAllCategoriesWithObjects} from 'core/selectors';
import {useSelector} from 'react-redux';
import {findObject} from 'core/helpers';
import {getDirections} from 'api/mapbox';
import {useFocusToUserLocation} from 'core/hooks';
import {lineString as makeLineString} from '@turf/helpers';

const layerStyles = {
  origin: {
    circleRadius: 5,
    circleColor: 'white',
  },
  destination: {
    circleRadius: 5,
    circleColor: 'white',
  },
  route: {
    lineColor: 'black',
    lineCap: MapBox.LineJoin.Round,
    lineWidth: 2,
    lineOpacity: 0.84,
    lineDasharray: [2, 4],
  },
  progress: {
    lineColor: '#314ccd',
    lineWidth: 3,
  },
};

export const ObjectDetailsMap = ({route}: IProps) => {
  const {objectId, categoryId} = route.params;
  const camera = useRef<MapBox.Camera>(null);
  const [direction, setDirection] = useState(null);
  const {
    focusToUserLocation,
    userLocation,
    ...userLocationProps
  } = useFocusToUserLocation(camera);

  const categories = useSelector(selectAllCategoriesWithObjects);

  const data = useMemo(() => {
    return categories ? findObject(categories, categoryId, objectId) : null;
  }, [categoryId, objectId, categories]);

  useEffect(() => {
    if (userLocation && data) {
      console.log(userLocation, data.location.coordinates);
      getDirections({from: userLocation, to: data.location.coordinates})
        .then(response => {
          setDirection(makeLineString(response.routes[0].geometry.coordinates));
        })
        .catch(console.dir);
    }
  }, [data, userLocation]);
  console.log(direction);
  return (
    <ClusterMap ref={camera}>
      {data ? (
        <MapBox.PointAnnotation
          id="ObjectDetailsMapPin"
          coordinate={data.location.coordinates}>
          <Icon name="objectPin" width={32} height={32} />
        </MapBox.PointAnnotation>
      ) : null}
      <MapBox.UserLocation {...userLocationProps} />
      <Button onPress={focusToUserLocation}>{'show'}</Button>

      {direction ? (
        <MapBox.ShapeSource id="routeSource" shape={direction}>
          <MapBox.LineLayer id="routeFill" style={layerStyles.route} />
        </MapBox.ShapeSource>
      ) : null}
    </ClusterMap>
  );
};
