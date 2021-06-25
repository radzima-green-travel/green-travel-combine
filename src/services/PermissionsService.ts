import {Alert, Linking, NativeModules} from 'react-native';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {isIOS} from './PlatformService';
import i18n from 'i18next';

class PermissionsService {
  async checkLocationPermissionIOS() {
    let status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    if (status === RESULTS.BLOCKED || status === RESULTS.UNAVAILABLE) {
      if (status === RESULTS.BLOCKED) {
        Alert.alert(
          i18n.t('common:locationPermissionTitle'),
          i18n.t('common:locationPermissionText'),

          [
            {
              text: i18n.t('common:locationPermissionCancel'),
              style: 'cancel',
            },
            {
              text: i18n.t('common:locationPermissionSetttings'),
              onPress: () => {
                Linking.openURL('app-settings:');
              },
            },
          ],
        );
      }

      if (status === RESULTS.UNAVAILABLE) {
        Alert.alert(
          i18n.t('common:locationPermissionTitle'),
          i18n.t('common:locationPermissionTextDevice'),
        );
      }

      return false;
    } else {
      status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      return status === RESULTS.GRANTED;
    }
  }

  async checkLocationPermissionAndroid() {
    const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (status === 'blocked') {
      Alert.alert(
        i18n.t('common:locationPermissionTitle'),
        i18n.t('common:locationPermissionText'),

        [
          {
            text: i18n.t('common:locationPermissionCancel'),
            style: 'cancel',
          },
          {
            text: i18n.t('common:locationPermissionSetttings'),
            onPress: () => {
              openSettings();
            },
          },
        ],
      );

      return false;
    }

    if (status === RESULTS.GRANTED) {
      const {
        gps,
      } = await NativeModules.LocationProvidersModule.getAvailableLocationProviders();

      if (!gps) {
        Alert.alert(
          i18n.t('common:locationPermissionTitle'),
          i18n.t('common:locationPermissionTextDevice'),
        );

        return false;
      }
      return true;
    }
    return false;
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
