import {AppRegistry, Platform, UIManager} from 'react-native';

import {enableScreens} from 'react-native-screens';
import 'react-native-gesture-handler';
import MapBox from '@react-native-mapbox-gl/maps';
import config from 'react-native-ultimate-config';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import App from './App';
import awsConfig from './src/aws-exports';
import {name as appName} from './app.json';
import ruTranslations from './src/locale/ru.json';
import enTranslations from './src/locale/en.json';
import {sentryService} from 'services/SentryService';
import {analyticsService} from 'services/AnalyticsService';
import {amplifyApiService} from 'services/AmplifyApiService';

amplifyApiService.init({
  ...awsConfig,
  aws_appsync_authenticationType: 'API_KEY',
});

enableScreens();

const resources = {
  ru: ruTranslations,
  en: enTranslations,
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

analyticsService.init(config.AMPLITUDE_KEY);

AppRegistry.registerComponent(appName, () => App);
