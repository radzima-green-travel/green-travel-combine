import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import React, {useEffect, useState, useRef} from 'react';
import {Linking, Platform} from 'react-native';
import {LoadingView} from 'atoms';
import {useDispatch} from 'react-redux';
import {canselSocialSignin} from 'core/reducers';
import {
  SocialLoginInAppBrowserScreenRouteProps,
  SocialLoginInAppBrowserScreenNavigationProps,
} from './types';

export const SocialLoginInAppBrowser = () => {
  const [loading, setLoading] = useState(true);
  const isManuallyCanceled = useRef(true);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<SocialLoginInAppBrowserScreenNavigationProps>();
  const {
    params: {url},
  } = useRoute<SocialLoginInAppBrowserScreenRouteProps>();

  useEffect(() => {
    return () => {
      if (isManuallyCanceled.current) {
        dispatch(canselSocialSignin());
      }
    };
  }, [dispatch]);

  return (
    <>
      <WebView
        onNavigationStateChange={event => {
          setLoading(event.loading);
          if (event.url.startsWith('radzima')) {
            isManuallyCanceled.current = false;
            navigation.getParent()?.goBack();
            Linking.openURL(event.url);
          }
        }}
        source={{uri: url}}
        originWhitelist={['*']}
        load
        incognito
        userAgent={
          Platform.OS === 'android'
            ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
            : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
        }
      />
      {loading ? <LoadingView transparent={false} /> : null}
    </>
  );
};
