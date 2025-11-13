import { useColorScheme, useStatusBar } from 'core/hooks';
import { useState } from 'react';
import {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { IMAGE_HEIGHT } from '../styles';

export function useObjectDetailsStatusBar(animatedValue: SharedValue<number>) {
  const [isScrolledBelowImage, setIsScrolledBelowImage] = useState(false);
  const theme = useColorScheme();

  const isLightTheme = theme === 'light';

  useAnimatedReaction(
    () => {
      return animatedValue.value >= IMAGE_HEIGHT;
    },
    isScrollBelow => {
      runOnJS(setIsScrolledBelowImage)(isScrollBelow);
    },
    [],
  );

  useStatusBar({
    style: isLightTheme && isScrolledBelowImage ? 'dark' : 'light',
  });
}
