import {memo, useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Icon, LottieAnimation} from 'atoms';
import {styles} from './styles';

interface IProps {
  value: number;
  marked: boolean;
  onPress?: (point: number) => void;
}

export const AnimatedStar = memo(({onPress, value, marked}: IProps) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    marked ? animationRef.current?.play() : animationRef.current?.reset();
  }, [marked, animationRef]);

  const handlePress = () => {
    onPress?.(value);
  };

  const renderIcon = () => (
    <Icon name={marked ? 'markedStar' : 'star'} size={42} />
  );

  return (
    <View style={styles.container}>
      {onPress ? (
        <TouchableOpacity onPress={handlePress}>
          <LottieAnimation
            ref={animationRef}
            name={'Star'}
            width={42}
            height={42}
            containerStyle={styles.animationContainer}
          />
          {renderIcon()}
        </TouchableOpacity>
      ) : (
        renderIcon()
      )}
    </View>
  );
});
