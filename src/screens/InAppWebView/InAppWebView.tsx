import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import React, { useState, useLayoutEffect } from 'react';
import { LoadingView } from 'atoms';
import {
  SocialLoginInAppBrowserScreenRouteProps,
  SocialLoginInAppBrowserScreenNavigationProps,
} from './types';
import { tryOpenURL } from 'core/helpers';

export const InAppWebView = () => {
  const [loading, setLoading] = useState(true);

  const navigation =
    useNavigation<SocialLoginInAppBrowserScreenNavigationProps>();

  const {
    params: { url, title },
  } = useRoute<SocialLoginInAppBrowserScreenRouteProps>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title, navigation]);

  return (
    <>
      <WebView
        onNavigationStateChange={event => {
          setLoading(event.loading);
        }}
        textZoom={100}
        source={{ uri: url }}
        originWhitelist={['*']}
        viewportContent={'width=device-width, user-scalable=no'}
        onShouldStartLoadWithRequest={request => {
          if (request.url !== url) {
            tryOpenURL(request.url);
            return false;
          }

          return true;
        }}
      />
      {loading ? <LoadingView transparent={false} /> : null}
    </>
  );
};
