import {AppRegistry, Linking} from 'react-native';

import {enableScreens} from 'react-native-screens';
import MapBox from '@rnmapbox/maps';
import 'react-native-gesture-handler';

import config from 'react-native-ultimate-config';
import * as Sentry from '@sentry/react-native';

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

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();

  const {type, url: newUrl} = (await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
    forceCloseOnRedirection: true,
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
  aws_user_pools_web_client_id: config.AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: signInUrls[2],
    redirectSignOut: signOutUrls[2],
    urlOpener: urlOpener,
  },
});

enableScreens();

MapBox.setAccessToken(config.MAP_ACCESS_TOKEN);
sentryService.init();

languageService.init();

analyticsService.init(config.AMPLITUDE_KEY);

const AppWithSentry = Sentry.wrap(App);

AppRegistry.registerComponent(appName, () => AppWithSentry);
