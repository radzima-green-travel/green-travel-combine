import MapBox from '@react-native-mapbox-gl/maps';

import React, {useRef, useCallback, useState, useEffect} from 'react';
import {permissionsService} from 'services/PermissionsService';
import {mapService} from 'services/MapService';
import {ICoordinates} from 'core/types';
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

  const focusToUserWithPoints = useCallback(
    async (coords: ICoordinates[]) => {
      const permissionGranted = await permissionsService.checkLocationPermission();
      if (!permissionGranted) {
        return;
      }

      if (userLocation) {
        const bounds = mapService.getBoundsFromCoords([
          userLocation,
          ...coords,
        ]);
        cameraRef.current?.fitBounds(...bounds);
      }
    },
    [userLocation, cameraRef],
  );

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
    focusToUserWithPoints,
  };
}
