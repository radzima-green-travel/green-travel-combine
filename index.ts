import {AppRegistry, Platform, UIManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import MapBox from '@react-native-mapbox-gl/maps';
import config from 'react-native-ultimate-config';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {sentryService} from 'services/SentryService';
import ruTranslations from './src/locale/ru.json';

const resources = {
  ru: ruTranslations,
};

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

MapBox.setAccessToken(config.MAP_ACCESS_TOKEN);
sentryService.init();

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

AppRegistry.registerComponent(appName, () => App);
