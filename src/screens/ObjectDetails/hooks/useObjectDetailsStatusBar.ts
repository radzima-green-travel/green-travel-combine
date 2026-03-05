import { useColorScheme, useStatusBar } from 'core/hooks';
import {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { IMAGE_HEIGHT } from '../styles';

export function useObjectDetailsStatusBar(scrollOffset: SharedValue<number>) {
  const theme = useColorScheme();
  const isLightTheme = theme === 'light';

  const { setStyle } = useStatusBar({ style: 'light' });

  useAnimatedReaction(
    () => scrollOffset.value >= IMAGE_HEIGHT,
    isScrollBelow => {
      runOnJS(setStyle)(isLightTheme && isScrollBelow ? 'dark' : 'light');
    },
    [isLightTheme],
  );
}
