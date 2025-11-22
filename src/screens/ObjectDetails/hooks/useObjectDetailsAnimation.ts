import {
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { useObjectDetailsStatusBar } from './useObjectDetailsStatusBar';

export function useObjectDetailsAnimation({
  imageHeight,
  onScrollEndReached,
}: {
  imageHeight: number;
  onScrollEndReached?: (endReached: boolean) => void;
}) {
  const translationY = useSharedValue(0);
  const isCloseToBottom = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;

    const { layoutMeasurement, contentOffset, contentSize } = event;

    isCloseToBottom.value =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
  });

  useAnimatedReaction(
    () => {
      return isCloseToBottom.value;
    },
    endReached => {
      if (onScrollEndReached) {
        runOnJS(onScrollEndReached)(endReached);
      }
    },
    [],
  );

  const imageSliderContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [0, imageHeight],
            [0, -imageHeight],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          ),
        },

        {
          scale: interpolate(
            translationY.value,
            [-imageHeight * 2, 0],
            [5, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          ),
        },
      ],
    };
  });

  useObjectDetailsStatusBar(translationY);

  return {
    scrollHandler,
    imageSliderContainerAnimatedStyle,
    translationY,
  };
}
