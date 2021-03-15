import {Alert, Linking} from 'react-native';
import {PERMISSIONS, request, check} from 'react-native-permissions';
import {isIOS} from './PlatformService';
import i18n from 'i18next';

const locationPermission = isIOS
  ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

class PermissionsService {
  async checkLocationPermission() {
    let status = await check(locationPermission);

    if (isIOS && status === 'denied') {
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

      return false;
    } else {
      status = await request(locationPermission);
      return status === 'granted';
    }
  }
}

export const permissionsService = new PermissionsService();
