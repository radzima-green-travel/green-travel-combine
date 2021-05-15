import MapBox from '@react-native-mapbox-gl/maps';

import React, {useRef, useCallback, useState, useEffect} from 'react';
import {permissionsService} from 'services/PermissionsService';
import {useTask} from './useTask';

export function useFocusToUserLocation(
  cameraRef: React.RefObject<MapBox.Camera | null>,
) {
  const [userLocation, setUserLocation] = useState<number[] | null>(null);
  const [userLocationVisible, setUserLocationVisible] = useState(false);
  const initiallyFocusedToUserLocation = useRef(false);

  const [getUserLocationTask, finishAllTasks] = useTask();

  const getUserLocation = useCallback(async () => {
    const permissionGranted = await permissionsService.checkLocationPermission();
    if (!permissionGranted) {
      return null;
    }

    if (!userLocationVisible) {
      setTimeout(() => {
        setUserLocationVisible(true);
      }, 0);
      const result = await getUserLocationTask();
      return result;
    } else if (userLocation) {
      return userLocation;
    }
  }, [getUserLocationTask, userLocation, userLocationVisible]);

  const focusToUserLocation = useCallback(async () => {
    const location = userLocation || (await getUserLocation());

    if (location) {
      cameraRef.current?.moveTo(location, 500);
    }
  }, [userLocation, getUserLocation, cameraRef]);

  useEffect(() => {
    if (
      userLocationVisible &&
      !initiallyFocusedToUserLocation.current &&
      userLocation
    ) {
      finishAllTasks(userLocation);
      initiallyFocusedToUserLocation.current = true;
    }
  }, [userLocation, userLocationVisible, finishAllTasks]);

  const saveUserLocation = useCallback(
    (event: MapBox.Location) => {
      if (!userLocationVisible) {
        setUserLocationVisible(true);
      }
      if (event?.coords) {
        const {latitude, longitude} = event.coords;
        setUserLocation([longitude, latitude]);
      }
    },
    [userLocationVisible],
  );

  return {
    focusToUserLocation,
    onUpdate: saveUserLocation,
    visible: userLocationVisible,
    showsUserHeadingIndicator: userLocationVisible,
    userLocation,
    getUserLocation,
  };
}
