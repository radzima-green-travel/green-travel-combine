import {AppRegistry} from 'react-native';

import {enableScreens} from 'react-native-screens';
import 'react-native-gesture-handler';
import MapBox from '@react-native-mapbox-gl/maps';
import config from 'react-native-ultimate-config';

import App from './App';
import awsConfig from './src/aws-exports';
import {name as appName} from './app.json';
import {sentryService} from 'services/SentryService';
import {analyticsService} from 'services/AnalyticsService';
import {languageService} from 'services/LanguageService';
import {Amplify} from 'aws-amplify';
import {navigate} from 'services/NavigationService';

async function urlOpener(url: string) {
  if (!url.includes('logout')) {
    navigate('SocialLoginInAppBrowser', {url: url});
  }
}

const signInUrls = awsConfig.oauth.redirectSignIn.split(',');
const signOutUrls = awsConfig.oauth.redirectSignOut.split(',');

console.log();

Amplify.configure({
  ...awsConfig,
  aws_appsync_authenticationType: 'API_KEY',
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: signInUrls[2],
    redirectSignOut: signOutUrls[2],
    urlOpener,
  },
});

enableScreens();

MapBox.setAccessToken(config.MAP_ACCESS_TOKEN);
sentryService.init();

languageService.init();

analyticsService.init(config.AMPLITUDE_KEY);

AppRegistry.registerComponent(appName, () => App);
