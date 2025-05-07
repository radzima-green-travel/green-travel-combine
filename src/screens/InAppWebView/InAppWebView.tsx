import {LoadingView} from 'atoms';
import {tryOpenURL} from 'core/helpers';
import {RouteQueryParams} from 'core/types';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import React, {useLayoutEffect, useState} from 'react';
import {WebView} from 'react-native-webview';

export const InAppWebView = () => {
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const {url, title} = useLocalSearchParams<RouteQueryParams.WebView>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [title, navigation]);

  return (
    <>
      <WebView
        onNavigationStateChange={event => {
          setLoading(event.loading);
        }}
        textZoom={100}
        source={{uri: url}}
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
