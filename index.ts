import {AppRegistry, Platform, UIManager} from 'react-native';

import {enableScreens} from 'react-native-screens';
import 'react-native-gesture-handler';
import MapBox from '@react-native-mapbox-gl/maps';
import config from 'react-native-ultimate-config';

import App from './App';
import awsConfig from './src/aws-exports';
import {name as appName} from './app.json';
import {sentryService} from 'services/SentryService';
import {analyticsService} from 'services/AnalyticsService';
import {amplifyApiService} from 'services/AmplifyApiService';
import {languageService} from 'services/LanguageService';

amplifyApiService.init({
  ...awsConfig,
  aws_appsync_authenticationType: 'API_KEY',
});

enableScreens();

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

MapBox.setAccessToken(config.MAP_ACCESS_TOKEN);
sentryService.init();

languageService.init();

analyticsService.init(config.AMPLITUDE_KEY);

AppRegistry.registerComponent(appName, () => App);
