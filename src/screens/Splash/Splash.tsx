import React, {useEffect} from 'react';

import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import {isIOS} from 'services/PlatformService';
import {useSplash} from './hooks';
import {styles} from './styles';

interface IProps {
  onAnimationEnd?: () => void;
  onFadeStart?: () => void;
}

export const Splash = ({onAnimationEnd, onFadeStart}: IProps) => {
  const {
    animateIOS,
    animateAndroid,
    containerAnimatedStyle,
    imageAnimatedStyle,
    textAnimatedStyle,
  } = useSplash();

  useEffect(() => {
    if (isIOS) {
      animateIOS(onAnimationEnd);
    } else {
      animateAndroid(onFadeStart, onAnimationEnd);
    }
  }, [animateAndroid, animateIOS]);

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
