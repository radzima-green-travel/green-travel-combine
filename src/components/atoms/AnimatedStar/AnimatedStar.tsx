import React, {memo, useLayoutEffect, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {LottieAnimation} from '../LottieAnimation';
import {styles} from './styles';

interface IProps {
  value: number;
  marked: boolean;
  onPress: (point: number) => void;
}

export const AnimatedStar = memo(({onPress, value, marked}: IProps) => {
  const animationRef = useRef<LottieView>(null);

  useLayoutEffect(() => {
    if (marked) {
      animationRef.current?.reset();
      animationRef.current?.play();
    } else {
      animationRef.current?.reset();
    }
  }, [marked, animationRef]);

  const handlePress = () => {
    animationRef.current?.reset();
    animationRef.current?.play();
    onPress(value);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
      style={styles.container}>
      <LottieAnimation
        ref={animationRef}
        name={'Star'}
        width={32}
        height={32}
        speed={1.5}
      />
    </TouchableOpacity>
  );
});
