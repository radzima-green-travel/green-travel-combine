import {ClusterMap, Icon, Portal} from 'atoms';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import MapBox from '@react-native-mapbox-gl/maps';
import {IProps} from './types';
import {createMarkerFromObject, selectSelectedMapMarker} from 'core/selectors';
import {useSelector} from 'react-redux';
import {getDirections} from 'api/mapbox';
import {useFocusToUserLocation, useObject} from 'core/hooks';
import {lineString as makeLineString} from '@turf/helpers';
import {
  ObjectDetailsMapBottomMenu,
  ObjectDetailsMapBottomMenuRef,
} from 'molecules';
import {IState} from 'core/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
type SelectedMarker = ReturnType<typeof createMarkerFromObject>;

export const ObjectDetailsMap = ({route}: IProps) => {
  const {objectId} = route.params;
  const camera = useRef<MapBox.Camera>(null);
  const [direction, setDirection] = useState(null);
  const bottomMenu = useRef<ObjectDetailsMapBottomMenuRef>(null);
  const {bottom} = useSafeAreaInsets();
  const data = useObject(objectId);

  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(
    () => createMarkerFromObject(null),
  );

  const selected = useSelector((state: IState) =>
    selectSelectedMapMarker(state, selectedMarkerId),
  );

  const onMenuHideEnd = useCallback(() => {
    setSelectedMarkerId(null);
  }, []);

  useEffect(() => {
    if (selected) {
      setSelectedMarker(createMarkerFromObject(selected));
      bottomMenu.current?.show();
    }
  }, [selected]);

  const {
    userLocation,
    focusToUserWithPoints,
    ...userLocationProps
  } = useFocusToUserLocation(camera);

  useEffect(() => {
    if (data) {
      setSelectedMarkerId(data.id);
    }
  }, [data]);

  useEffect(() => {
    if (userLocation && data) {
      getDirections({
        from: userLocation,
        to: [data?.location.lon, data?.location.lat],
      })
        .then(response => {
          setDirection(makeLineString(response.routes[0].geometry.coordinates));
        })
        .catch(console.dir);
    }
  }, [data, userLocation]);

  useEffect(() => {
    if (userLocationProps.visible && direction) {
      focusToUserWithPoints([[data?.location.lon, data?.location.lat]]);
    }
  }, [data, direction, focusToUserWithPoints, userLocationProps.visible]);

  return (
    <View style={{flex: 1}}>
      <ClusterMap ref={camera}>
        {data ? (
          <MapBox.PointAnnotation
            id="ObjectDetailsMapPin"
            coordinate={[data?.location.lon, data?.location.lat]}>
            <Icon name="objectPin" width={32} height={32} />
          </MapBox.PointAnnotation>
        ) : null}
        <MapBox.UserLocation minDisplacement={10} {...userLocationProps} />

        {direction ? (
          <MapBox.ShapeSource id="routeSource" shape={direction}>
            <MapBox.LineLayer id="routeFill" style={layerStyles.route} />
          </MapBox.ShapeSource>
        ) : null}
      </ClusterMap>

      <Portal>
        <ObjectDetailsMapBottomMenu
          data={selected}
          ref={bottomMenu}
          onHideEnd={onMenuHideEnd}
          bottomInset={bottom}
          onGetMorePress={() => {}}
        />
      </Portal>
    </View>
  );
};
