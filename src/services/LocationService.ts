import {Alert} from 'react-native';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import {Location as LoctaionCoords} from 'core/types';

import {isIOS} from './PlatformService';
import i18n from 'i18next';
import {
  createLocationErrorPreset,
  createPermissionErrorPreset,
  RequestError,
} from 'core/errors';

class LocationService {
  async checkLocationPermissionIOS() {
    const {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        this.handeLocationServicesDisabled();
        return false;
      }

      this.handleLocationPermissionDenied();
      return false;
    }

    return true;
  }

  async checkLocationPermissionAndroid() {
    const {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      this.handleLocationPermissionDenied();
      return false;
    } else {
      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        this.handeLocationServicesDisabled();
        return false;
      }

      return true;
    }
  }

  handleLocationPermissionDenied() {
    Alert.alert(i18n.t('common:locationPermissionText'), '', [
      {
        text: i18n.t('common:locationPermissionCancel'),
        style: 'cancel',
      },
      {
        text: i18n.t('common:locationPermissionSettings'),
        onPress: async () => await Linking.openSettings(),
      },
    ]);
  }

  handeLocationServicesDisabled() {
    Alert.alert('', i18n.t('common:locationPermissionText'));
  }

  async checkLocationPermission() {
    if (isIOS) {
      const result = await this.checkLocationPermissionIOS();
      return result;
    }
    const result = await this.checkLocationPermissionAndroid();
    return result;
  }

  async getLowAccuracyCurrentPosition() {
    try {
      const permissionGranted = await this.checkLocationPermission();
      if (!permissionGranted) {
        throw new RequestError(createPermissionErrorPreset());
      }

      const {coords} = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });

      return {
        lat: coords.latitude,
        lon: coords.longitude,
      } as LoctaionCoords;
    } catch (error) {
      throw new RequestError(createLocationErrorPreset());
    }
  }
}

export const locationService = new LocationService();
