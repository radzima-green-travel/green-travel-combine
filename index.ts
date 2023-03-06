import {AppRegistry, Linking, Platform} from 'react-native';

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
import InAppBrowser, {RedirectResult} from 'react-native-inappbrowser-reborn';
import {store} from 'core/store';
import {
  inAppBrowserSuccessOperation,
  inAppBrowserCancelOperation,
} from 'core/reducers';

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();

  const {type, url: newUrl} = (await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  })) as RedirectResult;

  if (type === 'success') {
    Linking.openURL(newUrl);
    store.dispatch(inAppBrowserSuccessOperation());
  } else if (type === 'cancel') {
    store.dispatch(inAppBrowserCancelOperation());
  }
}

const signInUrls = awsConfig.oauth.redirectSignIn.split(',');
const signOutUrls = awsConfig.oauth.redirectSignOut.split(',');

Amplify.configure({
  ...awsConfig,
  aws_appsync_authenticationType: 'API_KEY',
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: signInUrls[2],
    redirectSignOut: signOutUrls[2],
    urlOpener: Platform.OS === 'ios' ? urlOpener : undefined,
  },
});

enableScreens();

MapBox.setAccessToken(config.MAP_ACCESS_TOKEN);
sentryService.init();

languageService.init();

analyticsService.init(config.AMPLITUDE_KEY);

AppRegistry.registerComponent(appName, () => App);
