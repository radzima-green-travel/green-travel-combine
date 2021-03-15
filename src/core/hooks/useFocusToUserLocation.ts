import MapBox from '@react-native-mapbox-gl/maps';

import React, {useRef, useCallback, useState, useEffect} from 'react';
import {permissionsService} from 'services/PermissionsService';
export function useFocusToUserLocation(
  cameraRef: React.RefObject<MapBox.Camera | null>,
) {
  const [userLocation, setUserLocation] = useState<number[] | null>(null);
  const [userLocationVisible, setUserLocationVisible] = useState(false);
  const initiallyFocusedToUserLocation = useRef(false);

  const focusToUserLocation = useCallback(async () => {
    const permissionGranted = await permissionsService.checkLocationPermission();
    if (!permissionGranted) {
      return;
    }

    if (!userLocationVisible) {
      setUserLocationVisible(true);
    } else if (userLocation) {
      cameraRef.current?.moveTo(userLocation, 500);
    }
  }, [userLocation, userLocationVisible, cameraRef]);

  useEffect(() => {
    if (
      userLocationVisible &&
      !initiallyFocusedToUserLocation.current &&
      userLocation
    ) {
      focusToUserLocation();
      initiallyFocusedToUserLocation.current = true;
    }
  }, [userLocation, userLocationVisible, focusToUserLocation]);

  const saveUserLocation = useCallback((event: MapBox.Location) => {
    if (event?.coords) {
      const {latitude, longitude} = event.coords;
      setUserLocation([longitude, latitude]);
    }
  }, []);

  return {
    focusToUserLocation,
    onUpdate: saveUserLocation,
    visible: userLocationVisible,
    showsUserHeadingIndicator: userLocationVisible,
  };
}
