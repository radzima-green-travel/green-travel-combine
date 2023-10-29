import {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import {useColorScheme} from 'core/hooks';
import {IMAGE_HEIGHT} from '../styles';
import {useIsFocused} from '@react-navigation/native';
import {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';

export function useObjectDetailsStatusBar(animatedValue: SharedValue<number>) {
  const [isScrolledBelowImage, setIsScrolledBelowImage] = useState(false);
  const theme = useColorScheme();
  const isScreenFocused = useIsFocused();

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

  useEffect(() => {
    if (isScreenFocused) {
      const barStyle =
        isLightTheme && isScrolledBelowImage ? 'dark-content' : 'light-content';

      const entry = StatusBar.pushStackEntry({
        barStyle: barStyle,
        animated: true,
      });

      return () => {
        StatusBar.popStackEntry(entry);
      };
    }
  }, [isLightTheme, isScreenFocused, isScrolledBelowImage]);
}
