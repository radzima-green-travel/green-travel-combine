import React, {useEffect, useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'services/NavigationService';
import {MainNavigator} from './MainNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {bootstrapStart} from 'core/reducers';
import {IState} from 'core/store';
import {View, StyleSheet, StatusBar} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import {FONTS} from 'assets';
import RNBootSplash from 'react-native-bootsplash';

const SplasScreen = ({onAnimationEnd, onFadeStart}) => {
  const opacity = useSharedValue(1);
  const animatedValue = useSharedValue(0);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: interpolate(animatedValue.value, [0, 1], [0, -90])},
      ],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      transform: [
        {scale: animatedValue.value},
        {
          translateX: interpolate(animatedValue.value, [0, 1], [0, 35]),
        },
      ],
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide().then(() => {
        animatedValue.value = withTiming(
          1,
          {
            duration: 400,
            easing: Easing.out(Easing.ease),
          },
          () => {
            runOnJS(onFadeStart)();
            opacity.value = withTiming(
              0,
              {
                duration: 500,
                easing: Easing.out(Easing.ease),
              },
              () => {
                runOnJS(onAnimationEnd)();
              },
            );
          },
        );
      });
    }, 300);
  }, [animatedValue, opacity, onAnimationEnd, onFadeStart]);
  return (
    <Animated.View
      style={[
        containerAnimatedStyle,
        {
          ...StyleSheet.absoluteFill,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Animated.Image
        style={imageAnimatedStyle}
        source={require('./img/icon.png')}
      />

      <View
        style={{
          ...StyleSheet.absoluteFill,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Text
          style={[
            textAnimatedStyle,
            {
              color: '#444444',
              fontSize: 36,
              fontFamily: FONTS.secondarySemibold,
            },
          ]}>
          Radzima
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

export function RootNavigator() {
  const dispatch = useDispatch();
  const [splashTransitionFinished, setSplashTransitionFinished] =
    useState(false);
  const bootstrapFinished = useSelector(
    (state: IState) => state.bootsrap.finished,
  );

  useEffect(() => {
    dispatch(bootstrapStart());
  }, [dispatch]);

  const onAnimationEnd = useCallback(() => {
    setSplashTransitionFinished(true);
  }, []);

  const onFadeStart = useCallback(() => {
    StatusBar.pushStackEntry({
      barStyle: 'light-content',
      animated: true,
    });
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      {bootstrapFinished && <MainNavigator />}
      {splashTransitionFinished ? null : (
        <SplasScreen
          onFadeStart={onFadeStart}
          onAnimationEnd={onAnimationEnd}
        />
      )}
    </NavigationContainer>
  );
}
