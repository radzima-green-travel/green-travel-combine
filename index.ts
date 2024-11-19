import {Linking} from 'react-native';

import {enableScreens} from 'react-native-screens';
import MapBox from '@rnmapbox/maps';
import 'react-native-gesture-handler';
import awsConfig from './src/aws-exports';
import {sentryService} from 'services/SentryService';
import {analyticsService} from 'services/AnalyticsService';
import {languageService} from 'services/LanguageService';
import {Amplify} from 'aws-amplify';
import * as WebBrowser from 'expo-web-browser';

import {store} from 'core/store';
import {
  inAppBrowserSuccessOperation,
  inAppBrowserCancelOperation,
} from 'core/actions';

async function urlOpener(url, redirectUrl) {
  // await InAppBrowser.isAvailable();

  const result = await WebBrowser.openAuthSessionAsync(url, redirectUrl, {
    showTitle: false,
    // enableUrlBarHiding: true,
    enableDefaultShareMenuItem: false,
    // ephemeralWebSession: false,
    // forceCloseOnRedirection: true,
  });

  if (result.type === 'success') {
    Linking.openURL(result.url);
    store.dispatch(inAppBrowserSuccessOperation());
  } else if (result.type === 'cancel') {
    store.dispatch(inAppBrowserCancelOperation());
  }
}

const signInUrls = awsConfig.oauth.redirectSignIn.split(',');
const signOutUrls = awsConfig.oauth.redirectSignOut.split(',');

Amplify.configure({
  ...awsConfig,
  aws_appsync_authenticationType: 'API_KEY',
  aws_user_pools_web_client_id:
    process.env.EXPO_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: signInUrls[2],
    redirectSignOut: signOutUrls[2],
    urlOpener: urlOpener,
  },
});

enableScreens();

MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAP_ACCESS_TOKEN as string);
sentryService.init();

languageService.init();

analyticsService.init(process.env.EXPO_PUBLIC_AMPLITUDE_KEY as string);
