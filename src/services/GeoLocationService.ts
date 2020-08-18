import {PERMISSIONS, request, check} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {isIOS} from './PlatformService';
import {Alert, Linking} from 'react-native';
const config = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};

const locationPermission = isIOS
  ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

export function getMyCoordinates() {
  return new Promise(async (resolve, reject) => {
    let status = await check(locationPermission);

    if (isIOS && status === 'denied') {
      Alert.alert(
        'Нет доступа к локации',
        'Предоставить доступ к Геолокации что бы определить вашу позицию',
        [
          {
            text: 'Да',
            style: 'cancel',
          },
          {
            text: 'Настройки',
            onPress: () => {
              Linking.openURL('app-settings:');
            },
          },
        ],
      );
    } else {
      status = await request(locationPermission);

      if (status === 'granted') {
        Geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
          },
          () => {
            reject(new Error('location'));
          },
          config,
        );
      } else {
        reject(new Error('location'));
      }
    }
  });
}
