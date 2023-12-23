import {memo, useEffect, useRef} from 'react';
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

  useEffect(() => {
    marked ? animationRef.current?.play() : animationRef.current?.reset();
  }, [marked, animationRef]);

  const handlePress = () => {
    onPress(value);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <LottieAnimation
        ref={animationRef}
        name={'Star'}
        width={32}
        height={32}
      />
    </TouchableOpacity>
  );
});
