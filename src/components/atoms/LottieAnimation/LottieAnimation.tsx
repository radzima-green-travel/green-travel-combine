import React, {forwardRef, memo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import LottieView from 'lottie-react-native';
import {animations} from 'assets';
import {AnimationName} from 'core/types';

interface IProps {
  name: AnimationName;
  width: number;
  height: number;
  containerStyle?: StyleProp<ViewStyle>;
  speed?: number;
}

export const LottieAnimation = memo(
  forwardRef<LottieView, IProps>(
    ({name, width, height, containerStyle, speed}, ref) => {
      return (
        <View pointerEvents={'none'} style={containerStyle}>
          <LottieView
            ref={ref}
            source={animations[name]}
            style={{
              width,
              height,
            }}
            loop={false}
            speed={speed}
          />
        </View>
      );
    },
  ),
);
