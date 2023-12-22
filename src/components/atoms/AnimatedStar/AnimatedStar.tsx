import {memo, useEffect, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {LottieAnimation} from '../LottieAnimation';
import {styles} from './styles';

interface IProps {
  onPress: (point: number) => void;
  value: number;
  showAnimation: boolean;
}

export const AnimatedStar = memo(({onPress, value, showAnimation}: IProps) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    showAnimation
      ? animationRef.current?.play()
      : animationRef.current?.reset();
  }, [showAnimation, animationRef]);

  const handlePress = () => {
    onPress(value);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <LottieAnimation
        ref={animationRef}
        name={'Star'}
        width={42}
        height={42}
      />
    </TouchableOpacity>
  );
});
