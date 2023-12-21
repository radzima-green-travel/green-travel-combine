import {forwardRef, memo} from 'react';
import LottieView from 'lottie-react-native';
import {animations} from 'assets';
import {AnimationName} from 'core/types';
import {styles} from './styles';
import {View} from 'react-native';

export const LottieAnimation = memo(
  forwardRef<LottieView, {name: AnimationName}>(({name}, ref) => {
    return (
      <View pointerEvents={'none'} style={styles.container}>
        <LottieView
          ref={ref}
          source={animations[name]}
          style={styles.animationContainer}
          loop={false}
        />
      </View>
    );
  }),
);
