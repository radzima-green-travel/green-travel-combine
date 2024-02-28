import {Alert, Linking, NativeModules} from 'react-native';
import * as Location from 'expo-location';

import {isIOS} from './PlatformService';
import i18n from 'i18next';

class PermissionsService {
  async checkLocationPermissionIOS() {
    let {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      this.handleLocationPermissionDenied();
      return false;
    }

    return true;
  }

  async checkLocationPermissionAndroid() {
    let {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      this.handleLocationPermissionDenied();
      return false;
    } else {
      const {gps} =
        await NativeModules.LocationProvidersModule.getAvailableLocationProviders();

      if (!gps) {
        Alert.alert('', i18n.t('common:locationPermissionText'));

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
        onPress: async () => {
          const supported = await Linking.canOpenURL('app-settings:');
          if (supported) {
            Linking.openURL('app-settings:');
          } else {
            console.log('Failed to open app settings.');
          }
        },
      },
    ]);
  }

  async checkLocationPermission() {
    if (isIOS) {
      const result = await this.checkLocationPermissionIOS();
      return result;
    }
    const result = await this.checkLocationPermissionAndroid();
    return result;
  }
}

export const permissionsService = new PermissionsService();
