import {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import {ObjectDetailsScreenRouteProps} from './types';
import {useColorScheme} from 'core/hooks';
import {IMAGE_HEIGHT} from './styles';
import {useIsFocused, useRoute} from '@react-navigation/native';

export function useObjectDetailsStatusBar() {
  const {
    params: {animatedValue},
  } = useRoute<ObjectDetailsScreenRouteProps>();

  const [isScrolledBelowImage, setIsScrolledBelowImage] = useState(false);
  const theme = useColorScheme();
  const isScreenFocused = useIsFocused();

  const isLightTheme = theme === 'light';

  useEffect(() => {
    animatedValue?.addListener(({value}) => {
      setIsScrolledBelowImage(value >= IMAGE_HEIGHT);
    });

    return () => {
      animatedValue?.removeAllListeners();
    };
  }, [animatedValue]);

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
