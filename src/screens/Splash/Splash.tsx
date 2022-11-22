import React, {useEffect} from 'react';

import {View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {isIOS} from 'services/PlatformService';
import {useSplash} from './hooks';
import {styles} from './styles';

interface IProps {
  onAnimationEnd?: () => void;
  onFadeStart?: () => void;
}

export const Splash = ({onAnimationEnd, onFadeStart}: IProps) => {
  const {opacity, animatedValue, animateIOS, animateAndroid} = useSplash();

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

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

  useEffect(() => {
    if (isIOS) {
      animateIOS(onAnimationEnd);
    } else {
      animateAndroid(onFadeStart, onAnimationEnd);
    }
  }, [animateAndroid, animateIOS, onAnimationEnd, onFadeStart]);

  return (
    <Animated.View style={[containerAnimatedStyle, styles.container]}>
      <Animated.Image
        style={imageAnimatedStyle}
        source={require('./img/icon.png')}
      />

      <View style={styles.textContainer}>
        <Animated.Text style={[textAnimatedStyle, styles.text]}>
          Radzima
        </Animated.Text>
      </View>
    </Animated.View>
  );
};
