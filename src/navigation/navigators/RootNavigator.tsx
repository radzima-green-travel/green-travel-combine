import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'services/NavigationService';
import {MainNavigator} from './MainNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {bootstrapStart} from 'core/reducers';
import SplashScreen from 'react-native-splash-screen';
import {IState} from 'core/store';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import {FONTS} from 'assets';

const SplasScreen = ({onAnimationEnd}) => {
  const animatedValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    SplashScreen.hide();

    setTimeout(() => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(400),
      ]).start(() => {
        onAnimationEnd();
      });
    }, 300);
  }, [animatedValue, onAnimationEnd]);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Animated.Image
        style={{
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -80],
              }),
            },
          ],
        }}
        source={require('./img/icon.png')}
      />

      <View
        style={{
          ...StyleSheet.absoluteFill,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Text
          style={{
            color: '#444444',
            fontSize: 36,
            fontFamily: FONTS.secondarySemibold,
            transform: [
              {scale: animatedValue},
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 30],
                }),
              },
            ],
            opacity: animatedValue,
          }}>
          Radzima
        </Animated.Text>
      </View>
    </View>
  );
};

export function RootNavigator() {
  const dispatch = useDispatch();
  const [splashTransitionFinished, setSplashTransitionFinished] = useState(
    false,
  );
  const bootstrapFinished = useSelector(
    (state: IState) => state.bootsrap.finished,
  );

  useEffect(() => {
    dispatch(bootstrapStart());
  }, [dispatch]);

  const onAnimationEnd = useCallback(() => {
    setSplashTransitionFinished(true);
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      {bootstrapFinished && splashTransitionFinished ? (
        <MainNavigator />
      ) : (
        <SplasScreen onAnimationEnd={onAnimationEnd} />
      )}
    </NavigationContainer>
  );
}
